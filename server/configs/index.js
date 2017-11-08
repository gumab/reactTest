import path from 'path';

export default {
    ROOT_DIR: path.resolve(__dirname, '../..'),
    SEARCH_CNT: 50,
    SBOX_API_KEY: process.env.NODE_ENV != 'production' ?
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb25vaCIsImlhdCI6MTUwMTY1MTcxMiwiZXhwIjoyMTQ1ODUwMTEyLCJhdWQiOiJzbWlsZWJveC5nbWFya2V0LmNvLmtyIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInVzZXIiLCJwYXJ0bmVyIiwiYWRtaW5pc3RyYXRvciJdfQ.6_OLVI_agvOIfkth-3JravusdHofAiScsoHUzSGLGDc' :
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb25vaCIsImlhdCI6MTUwMTY1MTcxMiwiZXhwIjoyMTQ1ODUwMTEyLCJhdWQiOiJzbWlsZWJveC5nbWFya2V0LmNvLmtyIiwic3ViIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbInVzZXIiLCJwYXJ0bmVyIiwiYWRtaW5pc3RyYXRvciJdfQ.plm5ubniEgdMij-HMK5S8DVManFrvOMwzVdEL60UlV4'
};