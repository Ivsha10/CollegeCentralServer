const College = require('../model/College');
const CollegeLog = require('../model/CollegeLog');

const handleNewCollege = async (req, res) => {
    const file = req?.file?.filename;
    const obj = req.body;
    const name = req.body.name;
    const duplicate = await College.findOne({name: name}).exec();
    console.log(obj.user);
    if(!duplicate) 
    {
        const result = await College.create(
            {
                name: obj.name,
                address: obj.address,
                city: obj.city,
                state: obj.state,
                zip: obj.zip,
                tuitionFee: parseInt(obj.tuitionFee),
                acceptanceRate: parseFloat(obj.acceptanceRate/100),
                pdf: file,
                studentPopulation: parseInt(obj.studentPopulation),
                campusPopulation: parseInt(obj.campusPopulation),
                association: obj.association,
                division: obj.division,
                conference: obj.conference, 
                sports: obj.sports?.split(' '),
                sportsWebsite:obj.sportsWebsite,
                academicRanking:parseInt(obj.academicRanking),
                schoolWebsite:obj.schoolWebsite,
                avgScholarship:parseInt(obj.avgScholarship),
                majors: obj.majors?.split(' '), 
                twoYear: obj.twoYear === 'true' ? true : 'false',
                religion: obj.religion,
                relInfluence: obj.relInfluence,
                avgTemp: parseInt(obj.avgTemp),
                sunnyDays: parseInt(obj.sunnyDays),
                rainyDays: parseInt(obj.rainyDays),
                severeWeather: parseFloat(obj.severeWeather/100) 
    
            })
            await CollegeLog.create({
                name: obj.name,
                addedBy: obj.user,
                dateAdded: new Date()
            })
    
        res.status(200).json({'message':`${name} sucessfully added to the database!`, 'length': College.length });
    } else {
        console.log('duplicate');
        return res.status(409).json('This college already exists in our database!');
    }

}
const handleGetCollegeLogs = async (req, res) => {

    const colleges = await College.find().exec();
    const collegeLogs = await CollegeLog.find().exec();

    res.json({collegeLogs: collegeLogs, dbLength: colleges.length})
}

const getLastCollege = async (req, res) => {
    let colleges = await College.find().exec();
    const last = colleges.pop();
    const name = last.name;
    return res.json(name);
}


module.exports = {handleNewCollege, handleGetCollegeLogs, getLastCollege }