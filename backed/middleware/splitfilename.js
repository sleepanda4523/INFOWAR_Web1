
const splitfilename = (name) => {
    const index = name.lastIndexOf('.');
    const filename = name.substring(0,index);
    const filetype = name.substring(index+1);
    return { filename, filetype };
}

exports.splitFilename = splitfilename;