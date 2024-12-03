const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
	try {
		
		const tensor            = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
		const prediction        = model.predict(tensor);
		const score             = await prediction.data();
		const PredictionResult   = Math.max(...score) * 100;
        
        let result = { PredictionResult, label: "Cancer", suggestion: "Segera periksa ke dokter!" };
        if (PredictionResult < 0.5) {
            result.label        = "Non-cancer";
            result.suggestion   = "Penyakit kanker tidak terdeteksi."
        }
        
        return result;
    } catch (error) {
		throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
	}
}

module.exports = predictClassification;