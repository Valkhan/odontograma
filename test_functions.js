/* Test file to verify export functionality */
console.log('Testing export functionality...');

// Test data
var testData = {
    patientName: "João Silva",
    patientId: "12345",
    location: "São Paulo",
    appointmentNumber: "001",
    date: "15/01/2025",
    dentist: "Dr. Maria Santos",
    observations: "Teste de exportação",
    specifications: "Teste de especificações",
    teeth: [
        {
            id: 11,
            damages: [1, 5],
            customText: "CAR",
            isChild: false
        },
        {
            id: 16,
            damages: [2],
            customText: "COR",
            isChild: false
        }
    ],
    exportDate: new Date().toISOString(),
    version: "2.0"
};

// Test JSON export
console.log('JSON Export Test:');
console.log(JSON.stringify(testData, null, 2));

// Test function availability
console.log('Functions available:');
console.log('- createTextReport:', typeof createTextReport);
console.log('- downloadFile:', typeof downloadFile);
console.log('- exportPatientData:', typeof exportPatientData);
