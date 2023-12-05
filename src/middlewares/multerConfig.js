import multer from 'multer';

/**
 * Configuración del almacenamiento para la subida de fotos.
 * @type {multer.diskStorage}
 */
const storage = multer.diskStorage({
  /**
   * Función que especifica el directorio de destino para las fotos.
   * @param {Object} req - Objeto de solicitud (request).
   * @param {Object} file - Objeto de archivo.
   * @param {function} cb - Callback para notificar la finalización de la operación.
   */
  destination: function (req, file, cb) {
    cb(null, 'img/profile');
  },
  /**
   * Función que define el nombre del archivo para las fotos.
   * @param {Object} req - Objeto de solicitud (request).
   * @param {Object} file - Objeto de archivo.
   * @param {function} cb - Callback para notificar la finalización de la operación.
   */
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/**
 * Configuración del almacenamiento para la subida de archivos.
 * @type {multer.diskStorage}
 */
const fileStorage = multer.diskStorage({
  /**
   * Función que especifica el directorio de destino para los archivos.
   * @param {Object} req - Objeto de solicitud (request).
   * @param {Object} file - Objeto de archivo.
   * @param {function} cb - Callback para notificar la finalización de la operación.
   */
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Directorio para archivos
  },
  /**
   * Función que define el nombre del archivo para los archivos.
   * @param {Object} req - Objeto de solicitud (request).
   * @param {Object} file - Objeto de archivo.
   * @param {function} cb - Callback para notificar la finalización de la operación.
   */
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

/**
 * Middleware de Multer para la subida de fotos con límite de tamaño.
 * @type {multer.Multer}
 */
const photoUpload = multer({
  /**
   * Límites para la subida de fotos.
   * @type {Object}
   * @property {number} fileSize - Tamaño máximo permitido en bytes.
   */
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  /**
   * Configuración del almacenamiento para la subida de fotos.
   * @type {multer.StorageEngine}
   */
  storage: storage,
});

/**
 * Middleware de Multer para la subida de archivos.
 * @type {multer.Multer}
 */
const fileUpload = multer({ storage: fileStorage });

/**
 * Exporta los middlewares de Multer para la subida de fotos y archivos.
 * @exports {photoUpload,
  fileUpload
};}
 * @type {{photoUpload: multer.Multer, fileUpload: multer.Multer}}
 */
export  {
  photoUpload,
  fileUpload
};
