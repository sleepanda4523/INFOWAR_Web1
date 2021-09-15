
const splitfilename = (name) => {
    try {
        const index = name.lastIndexOf('.');
        const filename = name.substring(0,index);
        const filetype = name.substring(index+1);
        return { filename, filetype };
    } catch (error) {
        throw error;
    }
    
}

exports.splitFilename = splitfilename;