import axios from 'axios';
import { API_URL } from '../../constants';
import notify from '../../utils/Notify';

const fileUpload = (file, key, token) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  let method = 'fileUpload';
  let url = `${API_URL}/${method}?token=${token}&from=bank`;
  if (key === 'document_hash') {
    method = 'ipfsUpload';
    url = `${API_URL}/${method}?token=${token}`;
  }
  axios
    .post(url, formData, config)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.error) {
          throw res.data.error;
        } else if (key === 'logo_hash') {
          return res.data.name;
        } else {
          return res.data.hash;
        }
      } else {
        throw res.data.error;
      }
    })
    .catch((err) => {
      notify('something went wrong!', 'error');
    });
};

const triggerBrowse = (inp) => {
  const input = document.getElementById(inp);
  input.click();
};

const onFileChange = (e) => {
  if (e.target.files && e.target.files[0] != null) {
    fileUpload(e.target.files[0], e.target.getAttribute('data-key'));
  }
};

export { onFileChange, fileUpload, triggerBrowse };
