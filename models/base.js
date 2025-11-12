import { pool } from "../config/db.js"

export class BaseModel {
    tableName = null;
    query = null;

    find(data = "*") {
        if (!this.tableName) { return }
        else if (arguments.length > 1) {
            data = Array.from(arguments).join(", ")
        }
        this.query = `SELECT ${data} FROM ${this.tableName}`
        return this
    }

    where(key, value) {
        if (typeof key === 'object') {
            const obj = Object.keys(key);
            this.query += ` WHERE ${obj[0]}='${key[obj[0]]}' `
            if (obj.length > 1) {
                for (let i = 1; i < obj.length; i++) {
                    this.query += ` AND ${obj[i]} = '${key[obj[i]]}' `
                }
            }
        } else {
            this.query += ` WHERE ${key} = '${value}' `
        }
        return this;
    }

    orWhere(key, value) {
        this.query += ` OR  ${key}='${value}' `
        return this;
    }

    andWhere(key, value) {
        this.query += ` AND  ${key}='${value}' `
        return this;
    }

    limit(count) {
        this.query += ` LIMIT ${count} `
        return this;
    }

    orderBy(column, direction = "ASC") {
        this.query += ` ORDER BY ${column} ${direction} `
        return this;
    }

    async insert(data) {
        if (!this.tableName) { return }
        const keys = Object.keys(data).join(", ");
        const values = Object.values(data).map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
        this.query = `INSERT INTO ${this.tableName}(${keys}) VALUES(${values})`
        return this.build();

    }
    async deleteById(id) {
        this.query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;
        return await this.build();
    }

    set(key, val) {

        if (this.query === null) {
            this.query = `UPDATE ${this.tableName} SET `
        } else if (this.query.includes("SET")) {
            this.query += ", "
        }
        if (typeof key === 'object') {
            const obj = Object.keys(key)[0];;
            this.query += `${obj}='${key[obj]}' `
        } else {
            this.query += `${key}='${val}' `
        }


        return this
    }
    async build() {
        if (!this.query) { return }
        try {
            return await pool.query(this.query).then(([rows]) => rows)
        }
        catch (err) {
            return { error: err.message }
        }
    }

}