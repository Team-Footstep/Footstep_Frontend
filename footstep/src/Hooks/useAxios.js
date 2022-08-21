import defaultAxios from "axios";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  if(!opts.url) {
    return;
  };
};

export default useAxios;