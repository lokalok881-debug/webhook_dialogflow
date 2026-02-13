const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// DATA JADWAL (Bisa diganti database nanti)
const jadwal = {
    Senin: [
        { jam: "07:00 - 08:30", mapel: "Matematika" },
        { jam: "08:30 - 10:00", mapel: "Bahasa Indonesia" }
    ],
    Selasa: [
        { jam: "07:00 - 08:30", mapel: "IPA" },
        { jam: "08:30 - 10:00", mapel: "IPS" }
    ],
    Rabu: [
        { jam: "07:00 - 08:30", mapel: "Bahasa Inggris" }
    ],
    Kamis: [
        { jam: "07:00 - 08:30", mapel: "PKN" }
    ],
    Jumat: [
        { jam: "07:00 - 08:30", mapel: "Olahraga" }
    ]
};

app.post('/webhook', (req, res) => {

    const hariSekarang = new Date().toLocaleDateString('id-ID', {
        weekday: 'long'
    });

    let responseText = `📅 Jadwal hari ${hariSekarang}:\n\n`;

    if (jadwal[hariSekarang]) {
        jadwal[hariSekarang].forEach(item => {
            responseText += `🕒 ${item.jam} - ${item.mapel}\n`;
        });
    } else {
        responseText = "Hari ini tidak ada jadwal pelajaran.";
    }

    res.json({
        fulfillmentText: responseText
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
