const { predict } = require('../utils/vertexAiPredict');
exports.predict = async (req, res) => {
    try{
        const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

        const instanceData = {
            N: N, 
            P: P, 
            K: K, 
            temperature: temperature, 
            humidity: humidity, 
            ph: ph,
            rainfall: rainfall
        };

        const instances = [instanceData];
        const predictions = await predict(instances);
        console.log(predictions)
        res.status(200).json({ predictions });
    } catch(error) {
        res.status(500).json({error});
    }
}