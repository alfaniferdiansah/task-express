const router = require('express').Router();
const multer  = require('multer')
const request = require('request')
const upload = multer({ dest: 'uploads' })
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const {page, total} = req.query;
    res.send({
        status: 'success',
        message: 'Hello buddy',
        page,
        total
    })
});

router.get('/product/:id', (req, res) => {
    res.json({
        id: req.params.id
    })
})

router.post('/product', upload.single('image'), (req, res) => {
    const {nama, harga, pembeli} = req.body;
    const image = req.file;
    if (image) {
        const target =  path.join(__dirname, 'uploads', image.originalname)
        fs.renameSync(image.path, target)
        res.json({
            nama,
            harga,
            pembeli,
            image
        });
        // res.sendFile(target)
    }  
})

router.get('/product', function (req, res) {
    var url = 'https://jsonplaceholder.typicode.com/users';
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

router.get('/:category/:tag', (req, res) => {
    const {category, tag} = req.params;
    res.json({category, tag})
})

module.exports = router;