const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
	const modelPath = process.env.MODEL_URL;
	console.log(`Proses Memuat Model : ${modelPath}`);

	try {
		return await tf.loadGraphModel(modelPath);
	} catch (error) {
		console.error("Gagal Memuat Model Pastikan Path atau Jaringan Aman", error);
		throw error;
	}
}

module.exports = loadModel;