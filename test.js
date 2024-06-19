const list_of_file_json_string = [
    {"FileName":"VNP21_0366_01_TP.pdf","FileType":"TP - Test plan","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_03bfc94b-dc69-490d-a8b1-1fff9c0e1b2b","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_02_TR.pdf","FileType":"TO - Test order","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_d5ea3d06-069d-43f8-a7c7-583b27a7895a","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_03_TR.pdf","FileType":"TR - Test report","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_03bfc94b-dc69-490d-a8b1-1fff9c0e1b2b","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_03_TO.pdf","FileType":"TO - Test order","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_d5ea3d06-069d-43f8-a7c7-583b27a7895a","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_04_RC.pdf","FileType":"RC - Test record","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_03bfc94b-dc69-490d-a8b1-1fff9c0e1b2b","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_05_TO.pdf","FileType":"TO - Test order","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_d5ea3d06-069d-43f8-a7c7-583b27a7895a","FileSize":"1.08 MB"},
    {"FileName":"VNP21_0366_06_TR.pdf","FileType":"TR - Test report","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_d5ea3d06-069d-43f8-a7c7-583b27a7895a","FileSize":"1.08 MB"}
  ];
  
function extract_file_names(json_string) {
return json_string.map(file => {
    const parts = file.FileName.split('.');
    return parts[0];
});
}

    console.log(list_of_file_json_string)
 
  
function generate_document_number(json_string, document_type, project_number, is_belongs = false) {  
    const fileNames = extract_file_names(json_string);  

    // Detect the input document type  
    let doc_type_abbreviation;  
    
    if (document_type.includes("TO")) {  
        doc_type_abbreviation = "TO";  
    } else if (document_type.includes("TR")) {  
        doc_type_abbreviation = "TR";  
    } else if (document_type.includes("RC")) {  
        doc_type_abbreviation = "RC";  
    } else if (document_type.includes("TP")) {  
        doc_type_abbreviation = "TP";  
    } else {  
        throw new Error("Invalid document type provided.");  
    }  

    // Extract the max number for the specified document type  
    let max_number = 0;  
    let max_file_type = -1;
        let pair_type = "";
        
        
    
    fileNames.forEach(fileName => {  
        const parts = fileName.split('_');  
        const number = parseInt(parts[2]);  
        const type = parts[3].split('.')[0]; // Remove file extension  
    
        if (number > max_number) {  
            max_number = number;  
        }
        if (parts.length === 4) {
            const currentPrefix = parts[0] + '_' + parts[1];
            const cc = parseInt(parts[2], 10);
            const currentType = parts[3];
            
            if (is_belongs === true && doc_type_abbreviation === 'TR') {
                if (currentPrefix === project_number && currentType === 'TO') {
                    if (cc > max_file_type) {
                        max_file_type = cc;
                    }
                } 
            } else if (is_belongs === true && doc_type_abbreviation === 'TO') {
                if (currentPrefix === project_number && currentType === 'TR') {
                    if (cc > max_file_type) {
                        max_file_type = cc;
                    }
                }
            }
        }
    });  
    console.log(max_file_type)
    // Determine the next document number
    let next_number;
    if (is_belongs === false){
        next_number = max_number + 1;
    } else {
        next_number = max_file_type;
    }
    next_number = next_number.toString().padStart(2, '0');  

    const new_document_number = `${project_number}_${next_number}_${doc_type_abbreviation}`;

    return new_document_number;  
}  

const document_type = 'TO - Test order';
const project_number = 'VNP21_0366';
const new_doc_number = generate_document_number(list_of_file_json_string, document_type, project_number, true);
console.log(new_doc_number); // Output: VHC24_0667_02_TP