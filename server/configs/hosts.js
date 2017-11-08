let hosts = {
    SHIP_API:'http://shipapi.gmarket.co.kr',
    SBOX_API:'https://api.smilebox.gmarket.co.kr',
    LOG_SERVER:{
        HOST:'moafw.ebaykorea.com',
        PORT:5555
    }
};

if(process.env.NODE_ENV != 'production'){
    hosts = {
        SHIP_API:'http://shipapidev.gmarket.co.kr',
        SBOX_API:'https://devapi.smilebox.gmarket.co.kr',
        LOG_SERVER:{
            HOST:'devmoafw.ebaykorea.com',
            PORT:5555
        }
    };
}

export default hosts;