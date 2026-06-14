const {ImageKit}=require("@imagekit/nodejs/index.js");

const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadAchievement(file) {
    const result=await ImageKitClient.files.upload({
        file,
        fileName:Date.now(),
        folder:"Achievements"
    });
    return result
}

async function uploadHomePage(file) {
    const result=await ImageKitClient.files.upload({
        file,
        fileName:Date.now(),
        folder:"HomePage"
    });
    return result
}

async function deleteImageFromCloud(fileId) {
    try{
        await ImageKitClient.files.delete(fileId);
        console.log("Deleted the previous image");
    }catch(err){
        if(err.message && err.message.includes('404')){
            console.log("Image missing|Skipping deletion");
        }
        else{
            console.log("error occurred",err);
        }
    }
}

async function uploadCertificates(files) {
    const uploadPromises = files.map((file) => {
        return ImageKitClient.files.upload({
            file: file.buffer.toString('base64'),
            fileName: "certificates-" + Date.now() + "-" + Math.round(Math.random() * 1000), 
            folder: "certificates"
        });
    });

    return await Promise.all(uploadPromises);
}

module.exports={uploadAchievement,uploadHomePage,deleteImageFromCloud,uploadCertificates};