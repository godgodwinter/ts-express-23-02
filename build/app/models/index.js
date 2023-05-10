"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_studi_v2 = exports.sequelize_studi_v2 = exports.db = void 0;
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
const studi_v2_banksoal_aspek_model_1 = __importDefault(require("./studi_v2/studi_v2_banksoal_aspek.model"));
const studi_v2_banksoal_aspek_detail_model_1 = __importDefault(require("./studi_v2/studi_v2_banksoal_aspek_detail.model"));
const studi_v2_banksoal_soal_model_1 = __importDefault(require("./studi_v2/studi_v2_banksoal_soal.model"));
const studi_v2_banksoal_soal_pilihanjawaban_model_1 = __importDefault(require("./studi_v2/studi_v2_banksoal_soal_pilihanjawaban.model"));
const studi_v2_paketsoal_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal.model"));
const studi_v2_paketsoal_aspek_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal_aspek.model"));
const studi_v2_paketsoal_aspek_detail_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal_aspek_detail.model"));
const studi_v2_paketsoal_aspek_penilaian_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal_aspek_penilaian.model"));
const studi_v2_paketsoal_soal_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal_soal.model"));
const studi_v2_paketsoal_pilihanjawaban_model_1 = __importDefault(require("./studi_v2/studi_v2_paketsoal_pilihanjawaban.model"));
const studi_v2_proses_model_1 = __importDefault(require("./studi_v2/studi_v2_proses.model"));
const studi_v2_proses_aspek_detail_model_1 = __importDefault(require("./studi_v2/studi_v2_proses_aspek_detail.model"));
const studi_v2_proses_aspek_detail_soal_model_1 = __importDefault(require("./studi_v2/studi_v2_proses_aspek_detail_soal.model"));
const studi_v2_proses_aspek_detail_soal_pilihan_jawaban_model_1 = __importDefault(require("./studi_v2/studi_v2_proses_aspek_detail_soal_pilihan_jawaban.model"));
const studi_v2_hasil_model_1 = __importDefault(require("./studi_v2/studi_v2_hasil.model"));
const studi_v2_hasil_aspek_model_1 = __importDefault(require("./studi_v2/studi_v2_hasil_aspek.model"));
const studi_v2_hasil_aspek_detail_model_1 = __importDefault(require("./studi_v2/studi_v2_hasil_aspek_detail.model"));
const studi_v2_hasil_aspek_penilaian_model_1 = __importDefault(require("./studi_v2/studi_v2_hasil_aspek_penilaian.model"));
const ortu_model_1 = __importDefault(require("./ortu.model"));
// ! master
const masterdeteksi_model_1 = __importDefault(require("./master/masterdeteksi.model"));
// !apiprobk
const siswadetail_model_1 = __importDefault(require("./datasiswa/siswadetail.model"));
const apiprobk_model_1 = __importDefault(require("./datasiswa/apiprobk.model"));
const apiprobk_deteksi_model_1 = __importDefault(require("./datasiswa/apiprobk_deteksi.model"));
const apiprobk_deteksi_list_model_1 = __importDefault(require("./datasiswa/apiprobk_deteksi_list.model"));
const sequelize = new sequelize_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    port: parseInt(db_config_1.dbConfig.PORT),
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
exports.db = {
    //MASTERING
    Sequelize: sequelize_1.Sequelize, sequelize,
    admin: (0, admin_model_1.default)(sequelize, sequelize_1.Sequelize),
    owner: (0, owner_model_1.default)(sequelize, sequelize_1.Sequelize),
    siswa: (0, siswa_model_1.default)(sequelize, sequelize_1.Sequelize),
    ortu: (0, ortu_model_1.default)(sequelize, sequelize_1.Sequelize),
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
    // !master
    masterdeteksi: (0, masterdeteksi_model_1.default)(sequelize, sequelize_1.Sequelize),
    // !apiprobk
    siswadetail: (0, siswadetail_model_1.default)(sequelize, sequelize_1.Sequelize),
    apiprobk: (0, apiprobk_model_1.default)(sequelize, sequelize_1.Sequelize),
    apiprobk_deteksi: (0, apiprobk_deteksi_model_1.default)(sequelize, sequelize_1.Sequelize),
    apiprobk_deteksi_list: (0, apiprobk_deteksi_list_model_1.default)(sequelize, sequelize_1.Sequelize),
};
// !MASTERING-RELASI
exports.db.siswa.belongsTo(exports.db.kelas, {
    foreignKey: {
        name: 'kelas_id'
    },
});
exports.db.siswa.belongsTo(exports.db.sekolah, {
    foreignKey: {
        name: 'sekolah_id'
    },
});
exports.db.sekolah.belongsTo(exports.db.paket, {
    foreignKey: {
        name: 'paket_id'
    },
});
// db.katabijak.belongsTo(db.katabijakdetail, {
//   foreignKey: {
//     name: 'katabijakdetail_id'
//   },
// });
exports.db.katabijakdetail.belongsTo(exports.db.katabijak, {
    foreignKey: {
        name: 'katabijak_id'
    },
});
// !MASTERING-RELASI-END
// !apiprobk-relasi
exports.db.siswadetail.belongsTo(exports.db.siswa, {
    foreignKey: {
        name: 'siswa_id'
    },
});
exports.db.siswadetail.belongsTo(exports.db.apiprobk, {
    foreignKey: {
        name: 'apiprobk_id'
    },
});
exports.db.apiprobk_deteksi.belongsTo(exports.db.apiprobk, {
    foreignKey: {
        name: 'apiprobk_id'
    },
});
exports.db.apiprobk_deteksi.hasMany(exports.db.apiprobk_deteksi_list, {
    foreignKey: {
        name: 'apiprobk_deteksi_id'
    },
});
// !apiprobk-relasi-end
// !UJIAN-STUDI-RELASI
exports.db.ujian_proses_kelas.belongsTo(exports.db.ujian_proses, {
    foreignKey: {
        name: 'ujian_proses_id'
    },
});
// db.ujian_proses_kelas.belongsTo(db.ujian_paketsoal, {
//   foreignKey: {
//     name: 'ujian_paketsoal_id'
//   },
// });
exports.db.ujian_proses_kelas_siswa_kategori.belongsTo(exports.db.ujian_proses_kelas_siswa, {
    foreignKey: {
        name: 'ujian_proses_kelas_siswa_id'
    },
});
exports.db.ujian_proses.belongsTo(exports.db.sekolah, {
    foreignKey: {
        name: 'sekolah_id'
    },
});
exports.db.ujian_proses_kelas.belongsTo(exports.db.ujian_paketsoal, {
    foreignKey: {
        name: 'paketsoal_id'
    },
});
exports.db.ujian_proses_kelas.belongsTo(exports.db.kelas, {
    foreignKey: {
        name: 'kelas_id'
    },
});
exports.db.ujian_proses_kelas_siswa.belongsTo(exports.db.ujian_proses_kelas, {
    foreignKey: {
        name: 'ujian_proses_kelas_id'
    },
});
exports.db.ujian_proses_kelas_siswa.belongsTo(exports.db.siswa, {
    foreignKey: {
        name: 'siswa_id'
    },
});
exports.db.ujian_proses_kelas_siswa_kategori.belongsTo(exports.db.ujian_paketsoal_kategori, {
    foreignKey: {
        name: 'ujian_paketsoal_kategori_id'
    },
});
exports.db.ujian_paketsoal_soal_pilihanjawaban.belongsTo(exports.db.ujian_paketsoal_soal, {
    foreignKey: {
        name: 'ujian_paketsoal_soal_id'
    },
});
exports.db.ujian_paketsoal_kategori.belongsTo(exports.db.ujian_kategori, {
    foreignKey: {
        name: 'ujian_kategori_id'
    },
});
// !UJIAN-STUDI-RELASI-END
exports.sequelize_studi_v2 = new sequelize_1.Sequelize(db_config_1.dbConfig_studi_v2.DB, db_config_1.dbConfig_studi_v2.USER, db_config_1.dbConfig_studi_v2.PASSWORD, {
    host: db_config_1.dbConfig_studi_v2.HOST,
    port: parseInt(db_config_1.dbConfig.PORT),
    dialect: 'mysql',
    pool: {
        max: db_config_1.dbConfig_studi_v2.pool.max,
        min: db_config_1.dbConfig_studi_v2.pool.min,
        acquire: db_config_1.dbConfig_studi_v2.pool.acquire,
        idle: db_config_1.dbConfig_studi_v2.pool.idle
    }
});
exports.db_studi_v2 = {
    //MASTERING
    Sequelize: sequelize_1.Sequelize, sequelize_studi_v2: exports.sequelize_studi_v2,
    studi_v2_banksoal_aspek: (0, studi_v2_banksoal_aspek_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_banksoal_aspek_detail: (0, studi_v2_banksoal_aspek_detail_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_banksoal_soal: (0, studi_v2_banksoal_soal_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_banksoal_soal_pilihanjawaban: (0, studi_v2_banksoal_soal_pilihanjawaban_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal: (0, studi_v2_paketsoal_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal_aspek: (0, studi_v2_paketsoal_aspek_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal_aspek_detail: (0, studi_v2_paketsoal_aspek_detail_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal_aspek_penilaian: (0, studi_v2_paketsoal_aspek_penilaian_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal_soal: (0, studi_v2_paketsoal_soal_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_paketsoal_pilihanjawaban: (0, studi_v2_paketsoal_pilihanjawaban_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_proses: (0, studi_v2_proses_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_proses_aspek_detail: (0, studi_v2_proses_aspek_detail_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_proses_aspek_detail_soal: (0, studi_v2_proses_aspek_detail_soal_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_proses_aspek_detail_soal_pilihan_jawaban: (0, studi_v2_proses_aspek_detail_soal_pilihan_jawaban_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_hasil: (0, studi_v2_hasil_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_hasil_aspek: (0, studi_v2_hasil_aspek_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_hasil_aspek_detail: (0, studi_v2_hasil_aspek_detail_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
    studi_v2_hasil_aspek_penilaian: (0, studi_v2_hasil_aspek_penilaian_model_1.default)(exports.sequelize_studi_v2, sequelize_1.Sequelize),
};
// !STUDIV2-RELASI
exports.db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban.belongsTo(exports.db_studi_v2.studi_v2_banksoal_soal, {
    foreignKey: {
        name: 'studi_v2_banksoal_soal_id'
    },
});
exports.db_studi_v2.studi_v2_banksoal_soal.hasMany(exports.db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban, {
    foreignKey: {
        name: 'studi_v2_banksoal_soal_id'
    },
});
exports.db_studi_v2.studi_v2_banksoal_aspek_detail.hasMany(exports.db_studi_v2.studi_v2_banksoal_soal, {
    foreignKey: {
        name: 'studi_v2_banksoal_aspek_detail_id'
    },
});
exports.db_studi_v2.studi_v2_paketsoal_aspek_penilaian.belongsTo(exports.db_studi_v2.studi_v2_paketsoal_aspek, {
    foreignKey: {
        name: 'studi_v2_paketsoal_aspek_id'
    },
});
exports.db_studi_v2.studi_v2_paketsoal_aspek_penilaian.belongsTo(exports.db_studi_v2.studi_v2_paketsoal_aspek_detail, {
    foreignKey: {
        name: 'studi_v2_paketsoal_aspek_detail_id'
    },
});
// !STUDIV2-RELASI-END
exports.default = exports.db;
