import speakeasy from 'speakeasy';

import qrcode from 'qrcode';

function generateQrcode (req,res) {
  const secret= speakeasy.generateSecret({
    name: 'kimViana',
  });
  let teste;
  qrcode.toDataURL(secret.otpauth_url, function( err,data ) {
    return res.status(200).json({secret,data});
    ;
 });
};

function verifyAuthToken (req, res, next) {
  const { token } = req.body;
  let verificado= speakeasy.totp.verify({
    secret: 'z:ch;kL:L*^V[><.ZQPUs[SG<Tb$d59F',
    encoding: 'ascii',
    token: token,
  });

  if (verificado) {
    return next();
  } else {
    return res.status(401).json({ message: "token invalido",teste: verificado });
    }
}

export { generateQrcode, verifyAuthToken };
