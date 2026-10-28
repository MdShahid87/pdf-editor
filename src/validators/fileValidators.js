export const isValidFile = (file) => {
  return Boolean(file);
};

export const FILE_TYPE_ICONS = {
  "application/pdf": "fa-file-pdf",
  "application/msword": "fa-file-word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "fa-file-word",
  "application/vnd.ms-excel": "fa-file-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "fa-file-excel",
  "application/vnd.ms-powerpoint": "fa-file-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "fa-file-powerpoint",
  "image/jpeg": "fa-file-image",
  "image/png": "fa-file-image",
  "image/gif": "fa-file-image",
  "image/svg+xml": "fa-file-image",
  "text/plain": "fa-file-alt",
};
