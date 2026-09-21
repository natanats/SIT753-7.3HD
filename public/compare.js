
// RODUCT DATA
var PRODUCT_DATA = {

    // --- Gaming PCs ---
    gp1: {
        name: "ASUS ROG Gaming PC",
        specs: {
            Price:       { value: 2499, display: "$2,499",          higherIsBetter: false },
            CPU:         { value: 90,   display: "Intel i9-13900K", higherIsBetter: true  },
            RAM:         { value: 32,   display: "32 GB DDR5",      higherIsBetter: true  },
            Storage:     { value: 1000, display: "1 TB NVMe",       higherIsBetter: true  },
            GPU:         { value: 92,   display: "RTX 4080",        higherIsBetter: true  },
            Performance: { value: 95,   display: "Excellent",       higherIsBetter: true  }
        },
        pros: ["Top-tier gaming GPU", "High-speed DDR5 RAM", "Excellent cooling system"],
        cons: ["Expensive", "Large form factor", "Consumes high power"]
    },

    gp2: {
        name: "Alienware Aurora",
        specs: {
            Price:       { value: 2799, display: "$2,799",            higherIsBetter: false },
            CPU:         { value: 93,   display: "Intel i9-14900KF",  higherIsBetter: true  },
            RAM:         { value: 64,   display: "64 GB DDR5",        higherIsBetter: true  },
            Storage:     { value: 2000, display: "2 TB NVMe",         higherIsBetter: true  },
            GPU:         { value: 97,   display: "RTX 4090",          higherIsBetter: true  },
            Performance: { value: 99,   display: "Outstanding",       higherIsBetter: true  }
        },
        pros: ["Flagship RTX 4090 GPU", "64 GB RAM for heavy tasks", "Premium build quality"],
        cons: ["Very expensive", "Heavy and bulky", "Runs very hot under load"]
    },

    gp3: {
        name: "Gaming Monitor 240Hz",
        specs: {
            Price:           { value: 599, display: "$599",       higherIsBetter: false },
            "Refresh Rate":  { value: 240, display: "240 Hz",     higherIsBetter: true  },
            Resolution:      { value: 90,  display: "4K QD-OLED", higherIsBetter: true  },
            "Response Time": { value: 1,   display: "0.03 ms",    higherIsBetter: false },
            "Panel Type":    { value: 95,  display: "QD-OLED",    higherIsBetter: true  },
            HDR:             { value: 85,  display: "HDR400",      higherIsBetter: true  }
        },
        pros: ["Ultra-fast 240 Hz refresh", "Vivid QD-OLED colors", "Excellent HDR"],
        cons: ["Expensive for a monitor", "OLED burn-in risk", "Requires powerful GPU"]
    },

    gp4: {
        name: "RGB Gaming Keyboard",
        specs: {
            Price:          { value: 149,  display: "$149",           higherIsBetter: false },
            Switch:         { value: 85,   display: "Cherry MX Red",  higherIsBetter: true  },
            "Polling Rate": { value: 1000, display: "1000 Hz",        higherIsBetter: true  },
            Wireless:       { value: 0,    display: "No (USB-C)",      higherIsBetter: true  },
            RGB:            { value: 95,   display: "Per-key RGB",    higherIsBetter: true  },
            Warranty:       { value: 24,   display: "2 Years",         higherIsBetter: true  }
        },
        pros: ["Satisfying mechanical switches", "Full per-key RGB", "Durable build"],
        cons: ["No wireless option", "Louder than membrane", "No USB passthrough"]
    },

    // --- MacBooks / Working ---
    mb1: {
        name: "MacBook Air M2",
        specs: {
            Price:   { value: 1499, display: "$1,499",       higherIsBetter: false },
            CPU:     { value: 88,   display: "Apple M2",     higherIsBetter: true  },
            RAM:     { value: 8,    display: "8 GB Unified", higherIsBetter: true  },
            Storage: { value: 256,  display: "256 GB SSD",   higherIsBetter: true  },
            Battery: { value: 18,   display: "18 hrs",       higherIsBetter: true  },
            Weight:  { value: 1.24, display: "1.24 kg",      higherIsBetter: false }
        },
        pros: ["Exceptional battery life", "Fanless silent design", "Very lightweight"],
        cons: ["Only 8 GB base RAM", "macOS ecosystem only", "Limited base storage"]
    },

    mb2: {
        name: "MacBook Pro",
        specs: {
            Price:   { value: 2100, display: "$2,100",        higherIsBetter: false },
            CPU:     { value: 95,   display: "Apple M3 Pro",  higherIsBetter: true  },
            RAM:     { value: 18,   display: "18 GB Unified", higherIsBetter: true  },
            Storage: { value: 512,  display: "512 GB SSD",    higherIsBetter: true  },
            Battery: { value: 22,   display: "22 hrs",        higherIsBetter: true  },
            Weight:  { value: 1.41, display: "1.41 kg",       higherIsBetter: false }
        },
        pros: ["Best performance per watt", "Stunning Retina XDR display", "Long battery life"],
        cons: ["Expensive", "macOS only", "Soldered RAM — not upgradeable"]
    },

    mb3: {
        name: "iMac",
        specs: {
            Price:   { value: 1800, display: "$1,800",              higherIsBetter: false },
            CPU:     { value: 88,   display: "Apple M3",            higherIsBetter: true  },
            RAM:     { value: 8,    display: "8 GB Unified",        higherIsBetter: true  },
            Storage: { value: 256,  display: "256 GB SSD",          higherIsBetter: true  },
            Display: { value: 95,   display: "24\" 4.5K Retina",    higherIsBetter: true  },
            Weight:  { value: 4.5,  display: "4.5 kg (with stand)", higherIsBetter: false }
        },
        pros: ["Stunning 4.5K display built-in", "All-in-one compact design", "Silent operation"],
        cons: ["Not portable", "Base RAM is limited", "No upgrade path"]
    },

    mb4: {
        name: "Magic Keyboard",
        specs: {
            Price:          { value: 39, display: "$39",               higherIsBetter: false },
            Switch:         { value: 65, display: "Scissor mechanism", higherIsBetter: true  },
            "Polling Rate": { value: 0,  display: "Bluetooth",         higherIsBetter: false },
            Wireless:       { value: 1,  display: "Yes (Bluetooth)",   higherIsBetter: true  },
            RGB:            { value: 0,  display: "No backlight",      higherIsBetter: true  },
            Warranty:       { value: 12, display: "1 Year",            higherIsBetter: true  }
        },
        pros: ["Seamless Apple pairing", "Compact and lightweight", "Very affordable"],
        cons: ["No RGB lighting", "Low polling rate", "Less tactile than mechanical"]
    },

    // --- Accessories ---
    ac1: {
        name: "Ugreen C Hub",
        specs: {
            Price:            { value: 25.99, display: "$25.99",    higherIsBetter: false },
            Ports:            { value: 7,     display: "7-in-1",    higherIsBetter: true  },
            "USB-A":          { value: 3,     display: "3x USB-A",  higherIsBetter: true  },
            HDMI:             { value: 1,     display: "4K HDMI",   higherIsBetter: true  },
            "SD Card":        { value: 1,     display: "Yes",       higherIsBetter: true  },
            "Power Delivery": { value: 100,   display: "100W PD",   higherIsBetter: true  }
        },
        pros: ["Affordable price", "7-in-1 versatility", "100W Power Delivery"],
        cons: ["Plastic build", "Gets warm under load", "No Ethernet port"]
    },

    ac2: {
        name: "UGREEN Cable",
        specs: {
            Price:      { value: 10.49, display: "$10.49",        higherIsBetter: false },
            Type:       { value: 80,    display: "USB-C to USB-C",higherIsBetter: true  },
            Length:     { value: 2,     display: "2 meters",      higherIsBetter: true  },
            "Max Power":{ value: 60,    display: "60W",           higherIsBetter: true  },
            "Data Speed":{ value: 480,  display: "480 Mbps",      higherIsBetter: true  },
            Warranty:   { value: 18,    display: "18 Months",     higherIsBetter: true  }
        },
        pros: ["Very affordable", "Braided durable design", "Decent data speed"],
        cons: ["Only 60W charging", "Not Thunderbolt compatible", "480 Mbps only"]
    },

    ac3: {
        name: "Docking Station",
        specs: {
            Price:            { value: 64.99, display: "$64.99",          higherIsBetter: false },
            Ports:            { value: 12,    display: "12-in-1",         higherIsBetter: true  },
            "USB-A":          { value: 4,     display: "4x USB-A 3.0",    higherIsBetter: true  },
            HDMI:             { value: 2,     display: "Dual 4K HDMI",    higherIsBetter: true  },
            Ethernet:         { value: 1,     display: "Gigabit Ethernet", higherIsBetter: true  },
            "Power Delivery": { value: 100,   display: "100W PD",         higherIsBetter: true  }
        },
        pros: ["Dual 4K monitor support", "Gigabit Ethernet included", "12 ports total"],
        cons: ["More expensive than basic hubs", "Larger footprint", "Requires desk space"]
    }
};



// Stores currently selected products
var selected = [];



// Adds or removes products from comparison
function toggleCompare(id) {
    var idx = selected.indexOf(id);

    if (idx !== -1) {
        selected.splice(idx, 1);

    } else {
        if (selected.length >= 2) return;
        selected.push(id);
    }

    updateTray();
    updateCardStates();
}


// Removes a product from the compare tray
function removeFromTray(slotIndex) {
    selected.splice(slotIndex, 1);
    updateTray();
    updateCardStates();
}



// Updates compare tray UI and button states
function updateTray() {
    var tray  = document.getElementById('compare-tray');
    var count = selected.length;

    if (count > 0) {
        tray.classList.add('visible');
    } else {
        tray.classList.remove('visible');
    }

    // Slot A
    var slotA     = document.getElementById('slot-a');
    var slotAName = document.getElementById('slot-a-name');
    var removeA   = document.getElementById('remove-a');

    if (selected[0]) {
        slotAName.textContent = PRODUCT_DATA[selected[0]].name;
        slotA.classList.add('filled');
        removeA.style.display = 'inline';
    } else {
        slotAName.textContent = 'Slot A — empty';
        slotA.classList.remove('filled');
        removeA.style.display = 'none';
    }

    // Slot B
    var slotB     = document.getElementById('slot-b');
    var slotBName = document.getElementById('slot-b-name');
    var removeB   = document.getElementById('remove-b');

    if (selected[1]) {
        slotBName.textContent = PRODUCT_DATA[selected[1]].name;
        slotB.classList.add('filled');
        removeB.style.display = 'inline';
    } else {
        slotBName.textContent = 'Slot B — empty';
        slotB.classList.remove('filled');
        removeB.style.display = 'none';
    }

    // Count label
    document.getElementById('tray-info').textContent = count + ' / 2 selected';

    // Enable Compare button only when 2 products are selected
    document.getElementById('compare-now-btn').disabled = (count < 2);
}


// Updates product card visual states
function updateCardStates() {
    var full = (selected.length >= 2);

    Object.keys(PRODUCT_DATA).forEach(function(id) {
        var card = document.getElementById('card-' + id);
        var btn  = card ? card.querySelector('.btn-compare') : null;
        if (!btn) return;

        var isSelected = (selected.indexOf(id) !== -1);

        // Glow effect
        if (isSelected) {
            card.classList.add('comparing');
        } else {
            card.classList.remove('comparing');
        }

        if (isSelected) {
            btn.textContent = '✓ Added';
            btn.classList.add('selected');
            btn.disabled = false;
        } else if (full) {
            btn.textContent = '+ Compare';
            btn.classList.remove('selected');
            btn.disabled = true;
        } else {
            btn.textContent = '+ Compare';
            btn.classList.remove('selected');
            btn.disabled = false;
        }
    });
}



// Builds and displays the comparison result
function runComparison() {
    if (selected.length < 2) return;

    var pA = PRODUCT_DATA[selected[0]];
    var pB = PRODUCT_DATA[selected[1]];

    document.getElementById('cmp-name-a').textContent = pA.name;
    document.getElementById('cmp-name-b').textContent = pB.name;
    document.getElementById('th-a').textContent = pA.name;
    document.getElementById('th-b').textContent = pB.name;

    // Spec Rows 
    var tbody = document.getElementById('cmp-body');
    tbody.innerHTML = '';

    // spec keys 
    var allKeys = {};
    Object.keys(pA.specs).forEach(function(k) { allKeys[k] = true; });
    Object.keys(pB.specs).forEach(function(k) { allKeys[k] = true; });

    Object.keys(allKeys).forEach(function(key) {
        var sA = pA.specs[key];
        var sB = pB.specs[key];

        var winA = '', winB = '';
        if (sA && sB && sA.value !== sB.value) {
            var betterIsHigher = sA.higherIsBetter;
            if (betterIsHigher ? sA.value > sB.value : sA.value < sB.value) {
                winA = 'winner';
            } else {
                winB = 'winner';
            }
        }

        var row = document.createElement('tr');
        row.innerHTML =
            '<td>' + key + '</td>' +
            '<td class="' + winA + '">' + (sA ? sA.display : '—') + '</td>' +
            '<td class="' + winB + '">' + (sB ? sB.display : '—') + '</td>';
        tbody.appendChild(row);
    });

    // --- Pros/Cons ---
    buildInsight('insight-a', 'insight-title-a', pA);
    buildInsight('insight-b', 'insight-title-b', pB);

    // --- Summary ---
    buildSummary(pA, pB);

    var section = document.getElementById('comparison-section');
    section.classList.add('active');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// buildInsight(cardId, titleId, product)
function buildInsight(cardId, titleId, product) {
    var card = document.getElementById(cardId);
    var h5   = card.querySelector('h5');
    h5.textContent = product.name;
    card.innerHTML = '';
    card.appendChild(h5);

    product.pros.forEach(function(text) {
        var div = document.createElement('div');
        div.className = 'insight-item pro';
        div.textContent = text;
        card.appendChild(div);
    });

    product.cons.forEach(function(text) {
        var div = document.createElement('div');
        div.className = 'insight-item con';
        div.textContent = text;
        card.appendChild(div);
    });
}



// buildSummary(pA, pB)
function buildSummary(pA, pB) {

    // Gaming: GPU 50% + CPU 30% + RAM 20%
    var gamingA = ((pA.specs.GPU     ? pA.specs.GPU.value     : 0) * 0.5) +
                  ((pA.specs.CPU     ? pA.specs.CPU.value     : 0) * 0.3) +
                  ((pA.specs.RAM     ? pA.specs.RAM.value     : 0) * 0.2);

    var gamingB = ((pB.specs.GPU     ? pB.specs.GPU.value     : 0) * 0.5) +
                  ((pB.specs.CPU     ? pB.specs.CPU.value     : 0) * 0.3) +
                  ((pB.specs.RAM     ? pB.specs.RAM.value     : 0) * 0.2);

    // Work: CPU 50% + RAM 30% + Storage 20%
    var workA = ((pA.specs.CPU     ? pA.specs.CPU.value     : 0) * 0.5) +
                ((pA.specs.RAM     ? pA.specs.RAM.value     : 0) * 0.3) +
                ((pA.specs.Storage ? pA.specs.Storage.value : 0) * 0.0002);

    var workB = ((pB.specs.CPU     ? pB.specs.CPU.value     : 0) * 0.5) +
                ((pB.specs.RAM     ? pB.specs.RAM.value     : 0) * 0.3) +
                ((pB.specs.Storage ? pB.specs.Storage.value : 0) * 0.0002);

    var gamingWinner = (gamingA >= gamingB) ? pA.name : pB.name;
    var workWinner   = (workA   >= workB  ) ? pA.name : pB.name;

    document.getElementById('summary-grid').innerHTML =
        '<div class="summary-card gaming">' +
            '<div class="icon">🎮</div>' +
            '<div><div class="label">Best for Gaming</div>' +
            '<div class="winner-name">' + gamingWinner + '</div></div>' +
        '</div>' +
        '<div class="summary-card work">' +
            '<div class="icon">💼</div>' +
            '<div><div class="label">Best for Work</div>' +
            '<div class="winner-name">' + workWinner + '</div></div>' +
        '</div>';
}



// closeComparison
function closeComparison() {
    document.getElementById('comparison-section').classList.remove('active');
    selected = [];
    updateTray();
    updateCardStates();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}