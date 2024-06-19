
function generate_document_number(json_string, document_type, project_number) {
    
    // Count the number of document types exited in the json string
    const file_type_counts = {'TO': 0,'TR': 0,'RC': 0,'TP': 0 };

    list_of_file_json_string.forEach(file => {
      const file_type_prefix = file.FileType.split(' ')[0];
      if (file_type_counts.hasOwnProperty(file_type_prefix)) {
        file_type_counts[file_type_prefix]++;
      }
    });
    
    // Detect the input docyment type
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
    // Increment the count for the detected document type abbreviation
    const next_number = (file_type_counts[doc_type_abbreviation] + 1).toString().padStart(2, '0');
    // Generate the new document number
    const new_document_number = `${project_number}_${next_number}_${doc_type_abbreviation}`;

    return new_document_number
}

//////////////////////// Example in put /////////////////////////////

// var list_of_file_json_string = [{"FileName":"VHC24_0667_01_TP.pdf","FileType":"TP - Test plan","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_03bfc94b-dc69-490d-a8b1-1fff9c0e1b2b","FileSize":"1.08 MB"},  {"FileName":"VNP21_0366_01_TO.pdf","FileType":"TO - Test order","IsDirectType":true,"FileUploadedDate":"2024-06-05","FileGUID":"File_d5ea3d06-069d-43f8-a7c7-583b27a7895a","FileSize":"1.08 MB"}]
// console.log(list_of_file_json_string)
// const json_string = JSON.stringify(list_of_file_json_string);
// console.log(json_string);
// const document_type = 'TP - Test plan';
// const project_number = 'VHC24_0667';

// const new_doc_number = generate_document_number(json_string, document_type, project_number);
// console.log(new_doc_number); // Output: VHC24_0667_02_TP