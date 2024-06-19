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
  // function generate_document_number(json_string, document_type, project_number) {
  //     const fileNames = extract_file_names(json_string);
      
  //     // Detect the input docyment type
  //     let doc_type_abbreviation;
      
  //     if (document_type.includes("TO")) {
  //         doc_type_abbreviation = "TO";
  //     } else if (document_type.includes("TR")) {
  //         doc_type_abbreviation = "TR";
  //     } else if (document_type.includes("RC")) {
  //         doc_type_abbreviation = "RC";
  //     } else if (document_type.includes("TP")) {
  //         doc_type_abbreviation = "TP";
  //     } else {
  //         throw new Error("Invalid document type provided.");
  //     }
      
  //     // Extract the max number for the specified document type
  //     let max_number = 0;
  //     let latest_TR = null;
  //     let latest_TO = null;
  //     fileNames.forEach(fileName => {
  //         const parts = fileName.split('_');
  //         const number = parseInt(parts[2]);
  //         const type = parts[3];
          
  //         if (type === 'TR' && (latest_TR === null || number > latest_TR)) {
  //             latest_TR = number;
  //         } else if (type === 'TO' && (latest_TO === null || number > latest_TO)) {
  //             latest_TO = number;
  //         }
          
  //         if (number > max_number) {
  //             max_number = number;
  //         }
  //     });
  
  //     // Increment the max number to get the next number
  //     let next_number;
  //     if (doc_type_abbreviation === 'TR') {
  //         next_number = latest_TO!== null? latest_TO + 1 : max_number + 1;
  //     } else if (doc_type_abbreviation === 'TO') {
  //         next_number = latest_TR!== null? latest_TR : latest_TO!== null? latest_TO : max_number;
  //     } else {
  //         next_number = max_number + 1;
  //     }
  
  //     next_number = next_number.toString().padStart(2, '0');
  
  //     const new_document_number = `${project_number}_${next_number}_${doc_type_abbreviation}`;
  
  //     return new_document_number
  // }
  
  function generate_document_number(json_string, document_type, project_number) {  
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
      let latest_unpaired_TR = null;  
      let latest_unpaired_TO = null;  
      let paired_numbers = new Set();  
    
      fileNames.forEach(fileName => {  
          const parts = fileName.split('_');  
          const number = parseInt(parts[2]);  
          const type = parts[3].split('.')[0]; // Remove file extension  
    
          if (type === 'TR' && !paired_numbers.has(number)) {  
              latest_unpaired_TR = number;  
          } else if (type === 'TO' && !paired_numbers.has(number)) {  
              latest_unpaired_TO = number;  
          }  
    
          if (type === 'TR' || type === 'TO') {  
              if (!paired_numbers.has(number)) {  
                  paired_numbers.add(number);  
              } else {  
                  paired_numbers.delete(number);  
              }  
          }  
    
          if (number > max_number) {  
              max_number = number;  
          }  
      });  
    
      // Determine the next document number  
      let next_number;  
      if (doc_type_abbreviation === 'TR' && latest_unpaired_TO !== null) {  
          next_number = latest_unpaired_TO;  
      } else if (doc_type_abbreviation === 'TO' && latest_unpaired_TR !== null) {  
          next_number = latest_unpaired_TR;  
      } else {  
          next_number = max_number + 1;  
      }  
    
      next_number = next_number.toString().padStart(2, '0');  
      const new_document_number = `${project_number}_${next_number}_${doc_type_abbreviation}`;  
      return new_document_number;  
  }  
  // const fileNames = extract_file_names(list_of_file_json_string);
  // console.log(fileNames)
  //const json_string = JSON.stringify(list_of_file_json_string);
  // console.log(json_string);
  const document_type = 'TO - Test order';
  const project_number = 'VNP21_0366';
  
  const new_doc_number = generate_document_number(list_of_file_json_string, document_type, project_number);
  console.log(new_doc_number); // Output: VHC24_0667_02_TP