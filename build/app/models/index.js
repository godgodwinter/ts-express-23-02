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
const ujian_banksoal_aspek_model_1 = __importDefault(require("./studi/ujian_banksoal_aspek.model"));
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
const admin_model_1 = __importDefault(require("./admin.model"));
const owner_model_1 = __importDefault(require("./owner.model"));
const katabijak_model_1 = __importDefault(require("./katabijak.model"));
const katabijakdetail_model_1 = __importDefault(require("./katabijakdetail.model"));
const ujian_kategori_model_1 = __importDefault(require("./studi/ujian_kategori.model"));
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
const db = {
    //MASTERING
    Sequelize: sequelize_1.Sequelize, sequelize,
    admin: (0, admin_model_1.default)(sequelize, sequelize_1.Sequelize),
    owner: (0, owner_model_1.default)(sequelize, sequelize_1.Sequelize),
    siswa: (0, siswa_model_1.default)(sequelize, sequelize_1.Sequelize),
    kelas: (0, kelas_model_1.default)(sequelize, sequelize_1.Sequelize),
    sekolah: (0, sekolah_model_1.default)(sequelize, sequelize_1.Sequelize),
    paket: (0, paket_model_1.default)(sequelize, sequelize_1.Sequelize),
    katabijak: (0, katabijak_model_1.default)(sequelize, sequelize_1.Sequelize),
    katabijakdetail: (0, katabijakdetail_model_1.default)(sequelize, sequelize_1.Sequelize),
    // ujian_studi
    ujian_banksoal: (0, ujian_banksoal_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_kategori: (0, ujian_kategori_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_banksoal_aspek: (0, ujian_banksoal_aspek_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_files: (0, ujian_files_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_paketsoal_kategori: (0, ujian_paketsoal_kategori_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_paketsoal_soal_pilihanjawaban: (0, ujian_paketsoal_soal_pilihanjawaban_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_paketsoal_soal: (0, ujian_paketsoal_soal_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_paketsoal: (0, ujian_paketsoal_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_proses_kelas_siswa_kategori_hasil: (0, ujian_proses_kelas_siswa_kategori_hasil_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_proses_kelas_siswa_kategori: (0, ujian_proses_kelas_siswa_kategori_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_proses_kelas_siswa: (0, ujian_proses_kelas_siswa_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_proses_kelas: (0, ujian_proses_kelas_model_1.default)(sequelize, sequelize_1.Sequelize),
    ujian_proses: (0, ujian_proses_model_1.default)(sequelize, sequelize_1.Sequelize),
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
// db.katabijak.belongsTo(db.katabijakdetail, {
//   foreignKey: {
//     name: 'katabijakdetail_id'
//   },
// });
db.katabijakdetail.belongsTo(db.katabijak, {
    foreignKey: {
        name: 'katabijak_id'
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
db.ujian_proses.belongsTo(db.sekolah, {
    foreignKey: {
        name: 'sekolah_id'
    },
});
db.ujian_proses_kelas.belongsTo(db.ujian_paketsoal, {
    foreignKey: {
        name: 'paketsoal_id'
    },
});
db.ujian_proses_kelas.belongsTo(db.kelas, {
    foreignKey: {
        name: 'kelas_id'
    },
});
db.ujian_proses_kelas_siswa.belongsTo(db.ujian_proses_kelas, {
    foreignKey: {
        name: 'ujian_proses_kelas_id'
    },
});
db.ujian_proses_kelas_siswa.belongsTo(db.siswa, {
    foreignKey: {
        name: 'siswa_id'
    },
});
db.ujian_proses_kelas_siswa_kategori.belongsTo(db.ujian_paketsoal_kategori, {
    foreignKey: {
        name: 'ujian_paketsoal_kategori_id'
    },
});
db.ujian_paketsoal_soal_pilihanjawaban.belongsTo(db.ujian_paketsoal_soal, {
    foreignKey: {
        name: 'ujian_paketsoal_soal_id'
    },
});
db.ujian_paketsoal_kategori.belongsTo(db.ujian_kategori, {
    foreignKey: {
        name: 'ujian_kategori_id'
    },
});
// !UJIAN-STUDI-RELASI-END
exports.default = db;
