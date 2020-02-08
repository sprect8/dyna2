async function resolveIDs(conf, req, record, sharedPersistenceMapping, configurationMapping) {
    try {
        let filtered = conf.table.columns.filter(x => x.ref)
        for (const c in filtered) {
            let config = filtered[c];
            let tableName = config.ref.toLowerCase();
            let tableRef = configurationMapping[tableName];
            let key = tableRef.key;
            let disp = tableRef.display;

            let user = req.decoded.admin
            // like search on the name (display)
            // on key

            let where = { owner_user_id: user, [disp]: record[config.name] };

            let inst = await sharedPersistenceMapping[tableName].findAll({ where: where });
            inst = inst[0];

            record[config.name] = inst[key];
        }
    }
    catch (e) {
        console.log("Failed hard!", e)
    }
}

function updateAPI(app, conf, sharedPersistenceMapping, configurationMapping) {
    let tableName = conf.table.tableName.toLowerCase();

    app.put("/" + tableName, function (req, res) {
        let body = req.body;
        body.owner_user_id = req.decoded.admin;

        // resolve references first
        // assume data saved will be from the id (and not the value)
        resolveIDs(conf, req, body, sharedPersistenceMapping, configurationMapping).then(x => {
            if (body[conf.table.key]) {
                sharedPersistenceMapping[tableName].findById(body[conf.table.key]).then(inst => {
                    if (!inst) {
                        res.json({ "success": false, message: "Failed to update because we could not find the instance" });
                        return;
                    }

                    inst.update(body)
                        .then(i => {
                            res.json(i); // return as json instance
                        })
                        .catch(e => {
                            console.log(e);
                            res.status(400);
                        });
                })

            }
            else {
                sharedPersistenceMapping[tableName].create(body)
                    .then(i => {
                        res.json(i); // return as json instance
                    })
                    .catch(e => {
                        console.log(e);
                        res.status(400).json({ "success": false, message: "Failed because of " + e });
                    });
            }
        })
    });
}

module.exports = {
    updateAPI
}