const predictClassification = require("../services/inferenceService");
const { storeData, getData } = require("../services/firestoreService");
const crypto = require("crypto");

async function postPredictHandler(request, h) {
	const { image } = request.payload;
	const { model } = request.server.app;

	const { PredictionResult, label, suggestion } = await predictClassification(model, image);
	const id        = crypto.randomUUID();
	const createdAt = new Date().toISOString();

	const data = {
		id: id,
		result: label,
		suggestion: suggestion,
		createdAt: createdAt,
	};

	await storeData(id, data);

	const response = h.response({
		status: "success",
		message: PredictionResult > 0 ? "Model is predicted successfully" : "Model is predicted successfully",
		data,
	});
	response.code(201);
	return response;
}

async function getPredictHandler(request, h) {
	const { id } = request.params;

	const data = await getData(id);

	if (!data) {
		const response = h.response({
			status: "fail",
			message: "Prediction not found",
		});
		response.code(404);
		return response;
	}

	const response = h.response({
		status: "success",
		data,
	});
	response.code(200);
	return response;
}

module.exports = { postPredictHandler, getPredictHandler };