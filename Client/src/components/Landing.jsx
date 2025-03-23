import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function Landing() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlias, setShowAlias] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [copyButton, setCopyButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        'http://localhost:8080/shorten' + (customAlias ? `?alias=${encodeURIComponent(customAlias)}` : ''),
        { longUrl: url },
        {
          withCredentials: true,             
        }
      );

      setShortUrl(data.shortUrl);
      setShowPopup(true);
      toast.success("Link Created Successfully", {
        autoClose: 2000,
        hideProgressBar: true,
      });


    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error, {
        theme: "colored",
        transition: Bounce,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      })
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopyButton(true);
    toast.success("Link Copied to Clipboard", {
      autoClose: 2000,
      hideProgressBar: true,
    });

  };

  const handleClosePopup = () => {
    setUrl("")
    setCustomAlias("");
    setShowPopup(false);
    setShowAlias(false);
    setCopyButton(false);
  };

  const handleDetails = () => {
    toast.info("Details Can Be Shown", {
      autoClose: 2000,
      hideProgressBar: true,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-300 flex flex-col items-center justify-center p-6 relative">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Shorten Your URL 🔗
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xl flex flex-col gap-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
          required
        />

        {showAlias && (
          <motion.input
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            type="text"
            placeholder="Custom Alias (Optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="p-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200"
          />
        )}

        <button
          type="button"
          onClick={() => setShowAlias(!showAlias)}
          className="cursor-pointer bg-yellow-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-yellow-600 transition"
        >
          {showAlias ? 'Remove Custom Alias ✖️' : 'Add Custom Alias '}
        </button>

        <motion.button
          whileHover={{ scale: !loading ? 1.05 : 1 }}
          whileTap={{ scale: !loading ? 0.95 : 1 }}
          type="submit"
          disabled={loading}
          className={`cursor-pointer bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-purple-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Creating...' : 'Shorten URL 🚀'}
        </motion.button>
      </motion.form>


      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-2 shadow-2xl"
        >
          <div className="bg-white px-4 py-6 sm:p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">🎉 Short URL Created!</h2>
            <p className="mb-6 text-lg text-blue-600">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800"
              >
                {shortUrl}
              </a>
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleDetails}
                  className="cursor-pointer bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition w-full"
                >
                  Check Details
                </button>
                <button
                  onClick={handleCopy}
                  className="cursor-pointer bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition w-full"
                >
                  {copyButton ? "Copied" : "Copy Link"}
                </button>
              </div>

              <button
                onClick={handleClosePopup}
                className="cursor-pointer bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
