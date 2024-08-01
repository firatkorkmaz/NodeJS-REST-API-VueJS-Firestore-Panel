/* CRUD Class for Create/Read/Update/Delete Operations */
// NOTE: asyncHandler was used for errors instead of try-catch.

const { db } = require("../config/firebase.js");
const database = db.collection('parameters');


function currentTime() {
    const date = new Date();
    return date.getDate().toString().padStart(2, '0') + '/' +
        (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
        date.getFullYear() + ' ' +
        date.getHours().toString().padStart(2, '0') + ':' +
        date.getMinutes().toString().padStart(2, '0');
}

function jsonify(list1, list2) {
    const jsonObj = {};
    list1.forEach((element, index) => {
        jsonObj[element] = list2[index]
    });
    return jsonObj;
};

/********************************************************/

class Singleton {
    constructor() {
        const instance = this.constructor._instance;

        if (instance) {
            throw new Error(`Cannot instantiate ${this.constructor.name} directly. Use ${this.constructor.name}.getInstance().`);
        }

        this.constructor._instance = this;
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
}


class LOG extends Singleton {
    // Singleton
    constructor() {
        super();
    }

    async logData(req, res) {
        const dataSnapshot = await database.get();
        const allRows = dataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        var parameter_key = []; var value = []
        var dataObjList = JSON.parse(JSON.stringify(allRows));
        dataObjList.forEach(dataObj => {
            parameter_key.push(dataObj.parameter_key);
            value.push(dataObj.value);
        });

        const jsonLog = jsonify(parameter_key, value);
        return res.status(201).json(jsonLog);
    }
}

class CREATE extends Singleton {
    // Singleton
    constructor() {
        super();
    }

    async createData(req, res) {
        const jsondata = JSON.parse(JSON.stringify(req.body));
        jsondata['create_date'] = currentTime();
        await database.add(jsondata);
        res.redirect("/");
    }
}

class READ extends Singleton {
    // Singleton
    constructor() {
        super();
    }

    async readData(req, res) {
        const dataSnapshot = await database.get();
        const allRows = dataSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(201).json(allRows);
    }
}

class UPDATE extends Singleton {
    // Singleton
    constructor() {
        super();
    }

    async updateData(req, res) {
        const jsondata = JSON.parse(JSON.stringify(req.body));
        jsondata['create_date'] = currentTime();
        const { id } = req.params;
        await database.doc(id).update(jsondata);
        res.redirect("/");
    }
}

class DELETE extends Singleton {
    // Singleton
    constructor() {
        super();
    }

    async deleteData(req, res) {
        const { id } = req.params;
        await database.doc(id).delete();
        res.redirect("/");
    }
}


// Adapter Pattern for Different CRUD Operations
// Original Adapter
class AdapterCRUD {
    constructor(new_CRUD, process) {
        // processData will Be Used for All CRUD (@../routes/index.js)
        this.processData = async function (req, res) {
            switch (process) {
                case 'CREATE':
                    return new_CRUD.createData(req, res);
                case 'READ':
                    return new_CRUD.readData(req, res);
                case 'UPDATE':
                    return new_CRUD.updateData(req, res);
                case 'DELETE':
                    return new_CRUD.deleteData(req, res);
                case 'LOG':
                    return new_CRUD.logData(req, res);
                default:
                    return NaN;
            }
        }
    }
}
/*
// Simplified Adapter with eval()
class AdapterCRUD {
    constructor(new_CRUD, process) {
        // processData will Be Used for All CRUD (@../routes/index.js)
        this.processData = async function (req, res) {
            return eval("new_CRUD." + process.toLowerCase() + "Data")(req, res);
        }
    }
}
*/


// Factory Pattern for Creating Adapter-Based CRUD Instances
// Original Factory
class CRUDFactory {
    createCRUD(process) {
        switch (process) {
            case 'CREATE':
                return new AdapterCRUD(CREATE.getInstance(), process);
            case 'READ':
                return new AdapterCRUD(READ.getInstance(), process);
            case 'UPDATE':
                return new AdapterCRUD(UPDATE.getInstance(), process);
            case 'DELETE':
                return new AdapterCRUD(DELETE.getInstance(), process);
            case 'LOG':
                return new AdapterCRUD(LOG.getInstance(), process);
            default:
                throw new Error('Unknown Method!');
        }
    }
}
/*
// Simplified Factory with eval()
class CRUDFactory {
    createCRUD(process) {
        try {
            return new AdapterCRUD(new eval(process)(), process);
        }
        catch {
            throw new Error('Unknown Method!');
        }
    }
}
*/


// Export Factory Instance
module.exports = new CRUDFactory();
