const College = require('../model/College');
const CollegeLog = require('../model/CollegeLog');
const AWS = require('aws-sdk');
const User = require('../model/User');

AWS.config.update({
    accessKeyId: 'AKIAZOEMY2CS4XZSDE6Y',
    secretAccessKey: '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',
    region: 'us-east-1',
});


const handleNewCollege = async (req, res) => {

    try {
        const file = req?.file?.filename;
        const obj = req.body;
        const name = req.body.name;
        const duplicate = await College.findOne({ name: name }).exec();
        console.log(obj.user);
        if (!duplicate) {
            const result = await College.create(
                {
                    name: obj.name,
                    address: obj.address,
                    city: obj.city,
                    state: obj.state,
                    zip: obj.zip,
                    tuitionFee: parseInt(obj.tuitionFee),
                    acceptanceRate: parseFloat(obj.acceptanceRate / 100),
                    pdf: file,
                    studentPopulation: parseInt(obj.studentPopulation),
                    campusPopulation: parseInt(obj.campusPopulation),
                    association: obj.association,
                    division: obj.division,
                    conference: obj.conference,
                    sports: obj.sports?.split(' '),
                    sportsWebsite: obj.sportsWebsite,
                    academicRanking: parseInt(obj.academicRanking),
                    schoolWebsite: obj.schoolWebsite,
                    avgScholarship: parseInt(obj.avgScholarship),
                    majors: obj.majors?.split('\n'),
                    twoYear: obj.twoYear === 'true' ? true : 'false',
                    religion: obj.religion,
                    relInfluence: obj.relInfluence,
                    avgTemp: parseInt(obj.avgTemp),
                    sunnyDays: parseInt(obj.sunnyDays),
                    rainyDays: parseInt(obj.rainyDays),
                    severeWeather: parseFloat(obj.severeWeather / 100)

                })
            await CollegeLog.create({
                name: obj.name,
                addedBy: obj.user,
                dateAdded: new Date()
            })

            res.status(200).json({ 'message': `${name} sucessfully added to the database!`, 'length': College.length });
        } else {
            console.log('duplicate');
            return res.status(409).json('This college already exists in our database!');
        }
    } catch (error) {
        console.log('ERROR');
    }


}
const handleGetCollegeLogs = async (req, res) => {

    try {
        const colleges = await College.find().exec();
        const collegeLogs = await CollegeLog.find().exec();

        res.json({ collegeLogs: collegeLogs, dbLength: colleges.length })
    } catch (error) {
        console.log('MAJOR ERROR');
    }

}

const getLastCollege = async (req, res) => {
    try {
        let colleges = await College.find().exec();
        const last = colleges.pop();
        const name = last.name;
        return res.json(name);
    } catch (err) {
        console.log('ERROR');
    }
}

const getAllColleges = async (req, res) => {

    const bucketUrl = 'https://collegecentralbucket.s3.amazonaws.com/colleges'

    try {
        let colleges = await College.find().exec();
        colleges.forEach(clg => {
            
            let logoName = clg.logo;
            if(!clg.logo) clg.logo = 'https://collegecentralbucket.s3.amazonaws.com/colleges/logo/NOLOGO';
            const stringArr = clg.logo.split('/');
            logoName = stringArr[4];
            console.log(logoName);
            /* logoName = stringArr.indexOf(stringArr.length - 1);
            if(logoName === undefined) {logoName = 'logo';}
            logoName = logoName.replace(' ', '+'); */
            clg.logo = `${bucketUrl}/${clg.name}/logo/${logoName}`;
            clg.images.forEach(img => {
                let imgName = img;
                if(!imgName) imgName = '';
                let newImg = `${bucketUrl}/${clg.name}/${imgName}`;

                clg.images.push(newImg)

            })

           clg.images =  clg.images.filter(img => img.includes(bucketUrl));
        })
        return res.json(colleges);
    } catch (err) {
        console.log(err);
    }

}

const getCollege = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('ID', id);
        const foundCollege = await College.findById(id).exec();
        res.json(foundCollege);
    } catch (error) {
        console.log('getCollegeError');
    }

}

const updateCollege = async (req, res) => {

    try {
        const obj = req.body;
        const id = req.params.id;
        console.log(obj);
        let foundCollege = await College.findById(id).exec();

        if (foundCollege) {

            foundCollege.name = obj.name;
            foundCollege.address = obj.address;
            foundCollege.city = obj.city;
            foundCollege.state = obj.state;
            foundCollege.zip = obj.zip;
            foundCollege.tuitionFee = parseInt(obj.tuitionFee);
            foundCollege.acceptanceRate = parseFloat(obj.acceptanceRate / 100);
            foundCollege.studentPopulation = parseInt(obj.studentPopulation);
            foundCollege.campusPopulation = parseInt(obj.campusPopulation);
            foundCollege.association = obj.association;
            foundCollege.division = obj.division;
            foundCollege.conference = obj.conference;
            foundCollege.sports = obj.sports;
            foundCollege.sportsWebsite = obj.sportsWebsite;
            foundCollege.academicRanking = parseInt(obj.academicRanking);
            foundCollege.schoolWebsite = obj.schoolWebsite;
            foundCollege.avgScholarship = parseInt(obj.avgScholarship);
            foundCollege.majors = obj.majors;
            foundCollege.twoYear = (obj.twoYear === 'true' ? true : false);
            foundCollege.religion = obj.religion;
            foundCollege.relInfluence = obj.relInfluence;
            foundCollege.avgTemp = parseInt(obj.avgTemp);
            foundCollege.sunnyDays = parseInt(obj.sunnyDays);
            foundCollege.rainyDays = parseInt(obj.rainyDays);
            foundCollege.severeWeather = parseFloat(obj.severeWeather / 100)

            let r = await foundCollege.save();
            res.status(200).json({ 'message': `${foundCollege.name} sucessfully updated!`, 'length': College.length });
        } else {
            return res.status(409).json('This college does not exist in our database');
        }
    } catch (error) {
        console.log(error);

    }

}

const addFacilities = async (req, res) => {


    let images = await req.files;
    const id = req.params.id;

    const foundCollege = await College.findById(id).exec();


    const facilities = (req.body.facilities);

    const s3 = new AWS.S3();


    const UPLOAD = (val) => {
        const image = images[val];
        const params = {
            Bucket: `collegecentralbucket/colleges/${foundCollege.name}`,
            Key: image.originalname,
            Body: image.buffer,
        }

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file');
            }

            else {
                console.log(`File ${val + 1} uploaded successfully`);
                if (val < images.length - 1) {
                    val++;
                    UPLOAD(val)
                } else {
                    console.log('ALL FILES UPLOADED SUCCESSFULLY!');
                }

            }
        });
    }



    try {
        if (Array.isArray(facilities)) {

            for (let i = 0; i < facilities.length; i++) {
                let facility = JSON.parse(facilities[i]);
                facilities[i] = facility;

                let currentFacilityNames = foundCollege.facilities.map(fac => fac.name);
                console.log(currentFacilityNames);
                if (!currentFacilityNames.includes(facility.name)) {
                    foundCollege.facilities.push(facility);
                } else {
                    console.log('Facility already exists!');
                    return res.status(409).json({ 'error': 'Facility already exists in our database' })
                }

            }

        } else {
            let facility = JSON.parse(facilities);
            let currentFacilityNames = foundCollege.facilities.map(fac => fac.name);
            if (!currentFacilityNames.includes(facility.name)) {
                foundCollege.facilities.push(facility);
            } else {
                console.log('Facility already exists!');
                return res.status(409).json({ 'error': 'Facility already exists in our database' })
            }
        }
    } catch (error) {
        return res.sendStatus(500);
    }


    await foundCollege.save();
    UPLOAD(0);

    return res.status(200).json({ 'message': `Facilities added successfully!`, 'facilities': foundCollege.facilities });


    const getImageDemo = () => {
        const url = s3.getSignedUrl('getObject', {
            Bucket: 'collegecentralbucket',
            Key: 'Visa.jpg',
            Expires: 3600
        })

        return url;
    }






}

//THIS IS A DEMO API ---> DONT USE IN PRODUCTION 

const addCollegeLogo = async (req, res) => {


    const { id } = req.body;

    const foundCollege = await College.findById(id);

    const image = req.file;


    const bucketUrl = `collegecentralbucket/colleges/${foundCollege.name}/logo`;


    const params = {
        Bucket: `collegecentralbucket/colleges/${foundCollege.name}/logo`,
        Key: image.originalname,
        Body: image.buffer,
    }

    const s3 = new AWS.S3();

    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error uploading file');
        }
    });


    foundCollege.logo = `${bucketUrl}/${image.originalname}`;

    await foundCollege.save();

    return res.sendStatus(200);



}
module.exports = { handleNewCollege, handleGetCollegeLogs, getLastCollege, getAllColleges, getCollege, updateCollege, addFacilities, addCollegeLogo }