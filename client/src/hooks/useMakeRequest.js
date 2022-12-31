import { useState } from "react";
import axios from "axios";

const useMakeRequest = ({
  requestMethod,
  requestUrl,
  requestData,
  requestConfig,
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = async () => {
    setLoading(true);
    try {
      const res = await axios[requestMethod](
        requestUrl,
        requestData,
        requestConfig
      );
      setResponse(res);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { makeRequest, response, error, loading };
};

export default useMakeRequest;
