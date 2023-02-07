"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const sequelize_1 = require("sequelize");
// import fs from "fs"
// db
const siswa_model_1 = __importDefault(require("./siswa.model"));
const kelas_model_1 = __importDefault(require("./kelas.model"));
const sekolah_model_1 = __importDefault(require("./sekolah.model"));
const paket_model_1 = __importDefault(require("./paket.model"));
const ujian_banksoal_model_1 = __importDefault(require("./studi/ujian_banksoal.model"));
const ujian_files_model_1 = __importDefault(require("./studi/ujian_files.model"));
const ujian_paketsoal_kategori_model_1 = __importDefault(require("./studi/ujian_paketsoal_kategori.model"));
const ujian_paketsoal_soal_pilihanjawaban_model_1 = __importDefault(require("./studi/ujian_paketsoal_soal_pilihanjawaban.model"));
const ujian_paketsoal_soal_model_1 = __importDefault(require("./studi/ujian_paketsoal_soal.model"));
const ujian_paketsoal_model_1 = __importDefault(require("./studi/ujian_paketsoal.model"));
const ujian_proses_kelas_siswa_kategori_hasil_model_1 = __importDefault(require("./studi/ujian_proses_kelas_siswa_kategori_hasil.model"));
const ujian_proses_kelas_siswa_kategori_model_1 = __importDefault(require("./studi/ujian_proses_kelas_siswa_kategori.model"));
const ujian_proses_kelas_siswa_model_1 = __importDefault(require("./studi/ujian_proses_kelas_siswa.model"));
const ujian_proses_kelas_model_1 = __importDefault(require("./studi/ujian_proses_kelas.model"));
const ujian_proses_model_1 = __importDefault(require("./studi/ujian_proses.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: 'mysql',
    //prevent sequelize from pluralizing table names
    // define: {
    //     //prevent sequelize from pluralizing table names
    //     freezeTableName: true
    // },
    // operatorsAliases: false,
    pool: {
        max: db_config_1.dbConfig.pool.max,
        min: db_config_1.dbConfig.pool.min,
        acquire: db_config_1.dbConfig.pool.acquire,
        idle: db_config_1.dbConfig.pool.idle
    }
});
// const db = {
//   Sequelize,
// sequelize,
// siswa};
// get Master Data
const goGet_model_siswa = (0, siswa_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_kelas = (0, kelas_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_sekolah = (0, sekolah_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_paket = (0, paket_model_1.default)(sequelize, sequelize_1.Sequelize);
//get Ujian studi
const goGet_model_ujian_banksoal = (0, ujian_banksoal_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_files = (0, ujian_files_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_paketsoal_kategori = (0, ujian_paketsoal_kategori_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_paketsoal_soal_pilihanjawaban = (0, ujian_paketsoal_soal_pilihanjawaban_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_paketsoal_soal = (0, ujian_paketsoal_soal_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_paketsoal = (0, ujian_paketsoal_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_proses_kelas_siswa_kategori_hasil = (0, ujian_proses_kelas_siswa_kategori_hasil_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_proses_kelas_siswa_kategori = (0, ujian_proses_kelas_siswa_kategori_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_proses_kelas_siswa = (0, ujian_proses_kelas_siswa_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_proses_kelas = (0, ujian_proses_kelas_model_1.default)(sequelize, sequelize_1.Sequelize);
const goGet_model_ujian_proses = (0, ujian_proses_model_1.default)(sequelize, sequelize_1.Sequelize);
const db = {
    //MASTERING
    Sequelize: sequelize_1.Sequelize, sequelize, siswa: goGet_model_siswa,
    kelas: goGet_model_kelas, sekolah: goGet_model_sekolah,
    paket: goGet_model_paket,
    // ujian_studi
    ujian_banksoal: goGet_model_ujian_banksoal,
    ujian_files: goGet_model_ujian_files,
    ujian_paketsoal_kategori: goGet_model_ujian_paketsoal_kategori,
    ujian_paketsoal_soal_pilihanjawaban: goGet_model_ujian_paketsoal_soal_pilihanjawaban,
    ujian_paketsoal_soal: goGet_model_ujian_paketsoal_soal,
    ujian_paketsoal: goGet_model_ujian_paketsoal,
    ujian_proses_kelas_siswa_kategori_hasil: goGet_model_ujian_proses_kelas_siswa_kategori_hasil,
    ujian_proses_kelas_siswa_kategori: goGet_model_ujian_proses_kelas_siswa_kategori,
    ujian_proses_kelas_siswa: goGet_model_ujian_proses_kelas_siswa,
    ujian_proses_kelas: goGet_model_ujian_proses_kelas,
    ujian_proses: goGet_model_ujian_proses,
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
// !MASTERING-RELASI-END
// !UJIAN-STUDI-RELASI
db.ujian_proses_kelas.belongsTo(db.ujian_proses, {
    foreignKey: {
        name: 'ujian_proses_id'
    },
});
// db.ujian_proses_kelas.belongsTo(db.ujian_paketsoal, {
//   foreignKey: {
//     name: 'ujian_paketsoal_id'
//   },
// });
db.ujian_proses_kelas_siswa_kategori.belongsTo(db.ujian_proses_kelas_siswa, {
    foreignKey: {
        name: 'ujian_proses_kelas_siswa_id'
    },
});
// !UJIAN-STUDI-RELASI-END
exports.default = db;
