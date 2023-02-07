import { dbConfig } from "../config/db.config";
import { Sequelize } from "sequelize";
// import fs from "fs"
// db
import siswa from "./siswa.model";
import kelas from "./kelas.model";
import sekolah from "./sekolah.model";
import paket from "./paket.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  //prevent sequelize from pluralizing table names
  // define: {
  //     //prevent sequelize from pluralizing table names
  //     freezeTableName: true
  // },
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
// const db = {
//   Sequelize,
// sequelize,
// siswa};

const goGet_model_siswa = siswa(sequelize, Sequelize);
const goGet_model_kelas = kelas(sequelize, Sequelize);
const goGet_model_sekolah = sekolah(sequelize, Sequelize);
const goGet_model_paket = paket(sequelize, Sequelize);

const db = {
  Sequelize, sequelize, siswa: goGet_model_siswa,
  kelas: goGet_model_kelas, sekolah: goGet_model_sekolah,
  paket: goGet_model_paket
};

// !MASTERING-RELASI
db.siswa.belongsTo(db.kelas, {
  foreignKey: {
    name: 'kelas_id'
  },
});
db.siswa.belongsTo(db.sekolah, {
  foreignKey: {
    name: 'sekolah_id'
  },
});
db.sekolah.belongsTo(db.paket, {
  foreignKey: {
    name: 'paket_id'
  },
});

export default db

