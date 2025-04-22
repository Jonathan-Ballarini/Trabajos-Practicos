const http = require('http');
const fs = require('fs');
const path = require('path');

function serveFile(res, fileName, contentType) {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            sendError(res, 500);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

function sendError(res, errorCode) {
    let htmlError;

    if (errorCode === 404) {
        htmlError = html404;
    } else if (errorCode === 500) {
        htmlError = html500;
    }

    res.writeHead(errorCode, { 'Content-Type': 'text/html' });
    res.end(htmlError);
}

const server = http.createServer((req, res) => {
    const url = req.url;

    const staticPath = path.join(__dirname, 'public');
    const filePath = path.join(staticPath, url);
    const ext = path.extname(url);

    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.ttf': 'font/ttf',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
    };

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const contentType = contentTypes[ext] || 'application/octet-stream';
        fs.readFile(filePath, (err, data) => {
            if (err) {
                sendError(res, 500);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
        return;
    }

    switch (url) {
        case '/index':
            serveFile(res, 'index.html', 'text/html');
            break;
        case '/about':
            serveFile(res, 'about.html', 'text/html');
            break;
        case '/contact':
            serveFile(res, 'contact.html', 'text/html');
            break;
        default:
            sendError(res, 404);
    }
});

const html404 = `
<html>
    <head>
        <title>Error 404</title>
        <style>
            @font-face {
                font-family: 'Simpsons';
                src: url('/fuentes/Simpsonfont.ttf') format('truetype');
            }

            body {
                background-color: black;
                font-family: 'Simpsons', Arial, sans-serif;
                color: yellow;
                text-align: center;
            }

            h1 {
                font-size: 3em;
            }

            p {
                font-size: 2em;        
            }

            .background-container {
                max-width: 700px;
                margin: 0 auto;
                height: 500px;
                background-image: url('/imagenes/fondo-404.jpg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 50px;
            }
        </style>
    </head>

    <body>
        <h1>Error 404</h1>
        <div class="background-container"></div>
        <p>La pagina que estas buscando no existe <br> Intenta con otro enlace</p>
    </body>

    </html>
`;

const html500 = `
<html>
    <head>
        <title>Error 500</title>
        <style>
            @font-face {
                font-family: 'Simpsons';
                src: url('/fuentes/Simpsonfont.ttf') format('truetype');
            }

            body {
                background-color: black;
                font-family: 'Simpsons', Arial, sans-serif;
                color: yellow;
                text-align: center;
            }

            h1 {
                font-size: 3em;
            }

            p {
                font-size: 2em;        
            }

            .background-container {
                max-width: 700px;
                margin: 0 auto;
                height: 500px;
                background-image: url('/imagenes/fondo-500.jpg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 80px;
            }
        </style>
    </head>

    <body>
        <h1>Error 500</h1>
        <div class="background-container"></div>
        <p>Error interno del servidor <br> Estamos trabajando en tu solicitud</p>
    </body>

    </html>
`;

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});