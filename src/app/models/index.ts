import { dbConfig, dbConfig_studi_v2 } from "../config/db.config";
import { Sequelize } from "sequelize";
// import fs from "fs"
// db
import siswa from "./siswa.model";
import kelas from "./kelas.model";
import sekolah from "./sekolah.model";
import paket from "./paket.model";
import ujian_banksoal from "./studi/ujian_banksoal.model";
import ujian_banksoal_aspek from "./studi/ujian_banksoal_aspek.model";
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
import admin from "./admin.model";
import owner from "./owner.model";
import katabijak from "./katabijak.model";
import katabijakdetail from "./katabijakdetail.model";
import ujian_kategori from "./studi/ujian_kategori.model";
import studi_v2_banksoal_aspek from "./studi_v2/studi_v2_banksoal_aspek.model";
import studi_v2_banksoal_aspek_detail from "./studi_v2/studi_v2_banksoal_aspek_detail.model";
import studi_v2_banksoal_soal from "./studi_v2/studi_v2_banksoal_soal.model";
import studi_v2_banksoal_soal_pilihanjawaban from "./studi_v2/studi_v2_banksoal_soal_pilihanjawaban.model";
import studi_v2_paketsoal from "./studi_v2/studi_v2_paketsoal.model";
import studi_v2_paketsoal_aspek from "./studi_v2/studi_v2_paketsoal_aspek.model";
import studi_v2_paketsoal_aspek_detail from "./studi_v2/studi_v2_paketsoal_aspek_detail.model";
import studi_v2_paketsoal_aspek_penilaian from "./studi_v2/studi_v2_paketsoal_aspek_penilaian.model";
import studi_v2_paketsoal_soal from "./studi_v2/studi_v2_paketsoal_soal.model";
import studi_v2_paketsoal_pilihanjawaban from "./studi_v2/studi_v2_paketsoal_pilihanjawaban.model";
import studi_v2_proses from "./studi_v2/studi_v2_proses.model";
import studi_v2_proses_aspek_detail from "./studi_v2/studi_v2_proses_aspek_detail.model";
import studi_v2_proses_aspek_detail_soal from "./studi_v2/studi_v2_proses_aspek_detail_soal.model";
import studi_v2_proses_aspek_detail_soal_pilihan_jawaban from "./studi_v2/studi_v2_proses_aspek_detail_soal_pilihan_jawaban.model";
import studi_v2_hasil from "./studi_v2/studi_v2_hasil.model";
import studi_v2_hasil_aspek from "./studi_v2/studi_v2_hasil_aspek.model";
import studi_v2_hasil_aspek_detail from "./studi_v2/studi_v2_hasil_aspek_detail.model";
import studi_v2_hasil_aspek_penilaian from "./studi_v2/studi_v2_hasil_aspek_penilaian.model";
import ortu from "./ortu.model";

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

export const db = {
  //MASTERING
  Sequelize, sequelize,
  admin: admin(sequelize, Sequelize),
  owner: owner(sequelize, Sequelize),
  siswa: siswa(sequelize, Sequelize),
  ortu: ortu(sequelize, Sequelize),
  kelas: kelas(sequelize, Sequelize),
  sekolah: sekolah(sequelize, Sequelize),
  paket: paket(sequelize, Sequelize),
  katabijak: katabijak(sequelize, Sequelize),
  katabijakdetail: katabijakdetail(sequelize, Sequelize),
  // ujian_studi
  ujian_banksoal: ujian_banksoal(sequelize, Sequelize),
  ujian_kategori: ujian_kategori(sequelize, Sequelize),
  ujian_banksoal_aspek: ujian_banksoal_aspek(sequelize, Sequelize),
  ujian_files: ujian_files(sequelize, Sequelize),
  ujian_paketsoal_kategori: ujian_paketsoal_kategori(sequelize, Sequelize),
  ujian_paketsoal_soal_pilihanjawaban: ujian_paketsoal_soal_pilihanjawaban(sequelize, Sequelize),
  ujian_paketsoal_soal: ujian_paketsoal_soal(sequelize, Sequelize),
  ujian_paketsoal: ujian_paketsoal(sequelize, Sequelize),
  ujian_proses_kelas_siswa_kategori_hasil: ujian_proses_kelas_siswa_kategori_hasil(sequelize, Sequelize),
  ujian_proses_kelas_siswa_kategori: ujian_proses_kelas_siswa_kategori(sequelize, Sequelize),
  ujian_proses_kelas_siswa: ujian_proses_kelas_siswa(sequelize, Sequelize),
  ujian_proses_kelas: ujian_proses_kelas(sequelize, Sequelize),
  ujian_proses: ujian_proses(sequelize, Sequelize),

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



export const sequelize_studi_v2 = new Sequelize(dbConfig_studi_v2.DB, dbConfig_studi_v2.USER, dbConfig_studi_v2.PASSWORD, {
  host: dbConfig_studi_v2.HOST,
  dialect: 'mysql',
  pool: {
    max: dbConfig_studi_v2.pool.max,
    min: dbConfig_studi_v2.pool.min,
    acquire: dbConfig_studi_v2.pool.acquire,
    idle: dbConfig_studi_v2.pool.idle
  }
});

export const db_studi_v2 = {
  //MASTERING
  Sequelize, sequelize_studi_v2,
  studi_v2_banksoal_aspek: studi_v2_banksoal_aspek(sequelize_studi_v2, Sequelize),
  studi_v2_banksoal_aspek_detail: studi_v2_banksoal_aspek_detail(sequelize_studi_v2, Sequelize),
  studi_v2_banksoal_soal: studi_v2_banksoal_soal(sequelize_studi_v2, Sequelize),
  studi_v2_banksoal_soal_pilihanjawaban: studi_v2_banksoal_soal_pilihanjawaban(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal: studi_v2_paketsoal(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal_aspek: studi_v2_paketsoal_aspek(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal_aspek_detail: studi_v2_paketsoal_aspek_detail(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal_aspek_penilaian: studi_v2_paketsoal_aspek_penilaian(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal_soal: studi_v2_paketsoal_soal(sequelize_studi_v2, Sequelize),
  studi_v2_paketsoal_pilihanjawaban: studi_v2_paketsoal_pilihanjawaban(sequelize_studi_v2, Sequelize),
  studi_v2_proses: studi_v2_proses(sequelize_studi_v2, Sequelize),
  studi_v2_proses_aspek_detail: studi_v2_proses_aspek_detail(sequelize_studi_v2, Sequelize),
  studi_v2_proses_aspek_detail_soal: studi_v2_proses_aspek_detail_soal(sequelize_studi_v2, Sequelize),
  studi_v2_proses_aspek_detail_soal_pilihan_jawaban: studi_v2_proses_aspek_detail_soal_pilihan_jawaban(sequelize_studi_v2, Sequelize),
  studi_v2_hasil: studi_v2_hasil(sequelize_studi_v2, Sequelize),
  studi_v2_hasil_aspek: studi_v2_hasil_aspek(sequelize_studi_v2, Sequelize),
  studi_v2_hasil_aspek_detail: studi_v2_hasil_aspek_detail(sequelize_studi_v2, Sequelize),
  studi_v2_hasil_aspek_penilaian: studi_v2_hasil_aspek_penilaian(sequelize_studi_v2, Sequelize),

};


// !STUDIV2-RELASI
db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban.belongsTo(db_studi_v2.studi_v2_banksoal_soal, {
  foreignKey: {
    name: 'studi_v2_banksoal_soal_id'
  },
});
db_studi_v2.studi_v2_banksoal_soal.hasMany(db_studi_v2.studi_v2_banksoal_soal_pilihanjawaban, {
  foreignKey: {
    name: 'studi_v2_banksoal_soal_id'
  },
});
db_studi_v2.studi_v2_banksoal_aspek_detail.hasMany(db_studi_v2.studi_v2_banksoal_soal, {
  foreignKey: {
    name: 'studi_v2_banksoal_aspek_detail_id'
  },
});
db_studi_v2.studi_v2_paketsoal_aspek_penilaian.belongsTo(db_studi_v2.studi_v2_paketsoal_aspek, {
  foreignKey: {
    name: 'studi_v2_paketsoal_aspek_id'
  },
});
db_studi_v2.studi_v2_paketsoal_aspek_penilaian.belongsTo(db_studi_v2.studi_v2_paketsoal_aspek_detail, {
  foreignKey: {
    name: 'studi_v2_paketsoal_aspek_detail_id'
  },
});

// !STUDIV2-RELASI-END
export default db

