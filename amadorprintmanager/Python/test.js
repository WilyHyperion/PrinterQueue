const fs = require('fs');
const StlParser = require('stl-parser').StlParser;

async function calculatePrintTime(stlFilePath, layerHeightMm, printSpeedMmS, infillPercentage) {
    const stlData = await new Promise((resolve, reject) => {
        fs.readFile(stlFilePath, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });

    const stlMesh = StlParser.STL.fromBuffer(stlData);
    const volumeMm3 = stlMesh.volume * Math.pow(10, 9); // Convert m³ to mm³
    
    const effectiveVolumeMm3 = volumeMm3 * (infillPercentage / 100);
    const printTimeS = effectiveVolumeMm3 / (printSpeedMmS * Math.pow(layerHeightMm, 3));
    
    return printTimeS;
}

function estimatePrintCost(printTimeS, materialCostPerHour, additionalCostsPerHour = 0) {
    const hourlyCost = materialCostPerHour + additionalCostsPerHour; // USD/hour
    const printCost = (printTimeS / 3600) * hourlyCost;
    
    return {
        printCost: printCost.toFixed(2), // USD
        printTimeHours: (printTimeS / 3600).toFixed(2), // Hours
        breakdown: {
            materialCost: (materialCostPerHour / hourlyCost * 100).toFixed(2) + "%",
            additionalCosts: (additionalCostsPerHour / hourlyCost * 100).toFixed(2) + "%"
        }
    };
}

// Example Usage
async function main() {
    try {
        const stlFilePath = "../public/cat.stl";
        const layerHeightMm = 0.2;
        const printSpeedMmS = 50; // Example: 50 mm/s
        const infillPercentage = 20; // 20%
        const materialCostPerHour = 5; // USD/hour (example)
        const additionalCostsPerHour = 3; // Electricity, maintenance, etc. (example)
        
        const printTime = await calculatePrintTime(stlFilePath, layerHeightMm, printSpeedMmS, infillPercentage);
        console.log(`Estimated Print Time: ${(printTime / 60).toFixed(2)} minutes`);
        
        const printCostEstimate = estimatePrintCost(printTime, materialCostPerHour, additionalCostsPerHour);
        console.log("Estimated Print Cost:");
        console.log(`- Total: $${printCostEstimate.printCost}`);
        console.log(`- Print Time: ${printCostEstimate.printTimeHours} hours`);
        console.log("Cost Breakdown:");
        console.log(`- Material: ${printCostEstimate.breakdown.materialCost} of total cost`);
        console.log(`- Additional Costs: ${printCostEstimate.breakdown.additionalCosts} of total cost`);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
