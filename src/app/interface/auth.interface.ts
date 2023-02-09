
export interface IDecoded {
    id: number,
    role: string, //enkripsi base64 role |'siswa'|'admin'|'owner'|'sekolah'|'yayasan'|'ortu'
    iat: number,
    exp: number
}

export enum Role {
    "admin",
    "owner",
    "siswa",
    "sekolah",
    "yayasan",
    "ortu"
} 
