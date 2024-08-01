/* JS Playground: Integration of Design Patterns to CRUD */
// This File is Not Used in the Program, Only for Study
// Copy and Run This Code at: onecompiler.com/nodejs

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


class CREATE extends Singleton {
    constructor() {
        super();
    }

    createData(variable) {
        console.log("CREATE " + variable);
        return variable;
    }
}

class READ extends Singleton {
    constructor() {
        super();
    }

    readData(variable) {
        console.log("READ " + variable);
        return variable;
    }
}

class UPDATE extends Singleton {
    constructor() {
        super();
    }

    updateData(variable) {
        console.log("UPDATE " + variable);
        return variable;
    }
}

class DELETE extends Singleton {
    constructor() {
        super();
    }

    deleteData(variable) {
        console.log("DELETE " + variable);
        return variable;
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
            return new AdapterCRUD(eval(process).getInstance(), process);
        }
        catch {
            throw new Error('Unknown Method!');
        }
    }
}
*/


const crudfactory = new CRUDFactory();
function CRUD(process) {
    return crudfactory.createCRUD(process).processData("Data");
}


CRUD("READ");
console.log("---------");
CRUD("READ");
console.log("---------");
CRUD("CREATE");
console.log("---------");
CRUD("CREATE");
console.log("---------");
CRUD("CREATE");
console.log("---------");
CRUD("UPDATE");
console.log("---------");
CRUD("UPDATE");
console.log("---------");
CRUD("DELETE");
console.log("---------");
CRUD("DELETE");
console.log("---------");
CRUD("UPDATE");
console.log("---------");
