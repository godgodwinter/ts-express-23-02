import { dbConfig } from "../config/db.config";
import { Sequelize } from "sequelize";
// import fs from "fs"
// db
import siswa from "./siswa.model";
import kelas from "./kelas.model";
import sekolah from "./sekolah.model";
import paket from "./paket.model";
import ujian_banksoal from "./studi/ujian_banksoal.model";
import ujian_files from "./studi/ujian_files.model";
import ujian_paketsoal_kategori from "./studi/ujian_paketsoal_kategori.model";
import ujian_paketsoal_soal_pilihanjawaban from "./studi/ujian_paketsoal_soal_pilihanjawaban.model";
import ujian_paketsoal_soal from "./studi/ujian_paketsoal_soal.model";
import ujian_paketsoal from "./studi/ujian_paketsoal.model";
import ujian_proses_kelas_siswa_kategori_hasil from "./studi/ujian_proses_kelas_siswa_kategori_hasil.model";
import ujian_proses_kelas_siswa_kategori from "./studi/ujian_proses_kelas_siswa_kategori.model";
import ujian_proses_kelas_siswa from "./studi/ujian_proses_kelas_siswa.model";
import ujian_proses_kelas from "./studi/ujian_proses_kelas.model";
import ujian_proses from "./studi/ujian_proses.model";

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

// get Master Data
const goGet_model_siswa = siswa(sequelize, Sequelize);
const goGet_model_kelas = kelas(sequelize, Sequelize);
const goGet_model_sekolah = sekolah(sequelize, Sequelize);
const goGet_model_paket = paket(sequelize, Sequelize);
//get Ujian studi
const goGet_model_ujian_banksoal = ujian_banksoal(sequelize, Sequelize);
const goGet_model_ujian_files = ujian_files(sequelize, Sequelize);
const goGet_model_ujian_paketsoal_kategori = ujian_paketsoal_kategori(sequelize, Sequelize);
const goGet_model_ujian_paketsoal_soal_pilihanjawaban = ujian_paketsoal_soal_pilihanjawaban(sequelize, Sequelize);
const goGet_model_ujian_paketsoal_soal = ujian_paketsoal_soal(sequelize, Sequelize);
const goGet_model_ujian_paketsoal = ujian_paketsoal(sequelize, Sequelize);
const goGet_model_ujian_proses_kelas_siswa_kategori_hasil = ujian_proses_kelas_siswa_kategori_hasil(sequelize, Sequelize);
const goGet_model_ujian_proses_kelas_siswa_kategori = ujian_proses_kelas_siswa_kategori(sequelize, Sequelize);
const goGet_model_ujian_proses_kelas_siswa = ujian_proses_kelas_siswa(sequelize, Sequelize);
const goGet_model_ujian_proses_kelas = ujian_proses_kelas(sequelize, Sequelize);
const goGet_model_ujian_proses = ujian_proses(sequelize, Sequelize);

const db = {
  //MASTERING
  Sequelize, sequelize, siswa: goGet_model_siswa,
  kelas: goGet_model_kelas, sekolah: goGet_model_sekolah,
  paket: goGet_model_paket,
  // ujian_studi
  ujian_banksoal: goGet_model_ujian_banksoal,
  ujian_files: goGet_model_ujian_files,
  ujian_paketsoal_kategori: goGet_model_ujian_paketsoal_kategori,
  goGet_model_ujian_paketsoal_soal_pilihanjawaban: goGet_model_ujian_paketsoal_soal_pilihanjawaban,
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

db.ujian_proses_kelas.belongsTo(db.ujian_proses_kelas, {
  foreignKey: {
    name: 'ujian_proses_kelas_id'
  },
});
db.ujian_proses_kelas.belongsTo(db.ujian_paketsoal, {
  foreignKey: {
    name: 'ujian_paketsoal_id'
  },
});
db.ujian_proses_kelas_siswa_kategori.belongsTo(db.ujian_proses_kelas_siswa, {
  foreignKey: {
    name: 'ujian_proses_kelas_siswa_id'
  },
});
// !UJIAN-STUDI-RELASI-END
export default db

