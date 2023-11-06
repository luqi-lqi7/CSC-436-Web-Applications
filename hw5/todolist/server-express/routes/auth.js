const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIJKAIBAAKCAgEAqAGWWllii59noMZiPU+qNdohHfS6aPPf1kU/0f+p9v0ul+jy
nL44hn1OyYk6jDag3uOq1UWCRyZF0QBOeeXhEUGJnr8U5vtT13jBz429KRP7ECme
JImZ/v26Sl1Iy4X/22MRxA91FJD/MfHH5/Bt0WLL4OpKgCtgmfTZkV0Ooq8LBH95
CYI+cs5nyoWfKGT7bS92F8l1H0Tx1KkNdPRLgxXSo3mHICjtBUd/wT4xuUVfNwhW
xk7OlO0/awLE5PmZXmhVlgeLM8iec9ChVvWF+tEKzuu0jMX21ihrF+LNLUVpvmCr
UH1yjIpk5LXxyOC8rKKZLcku/OYYRQtatIqLHnX/87/JxnVRruIdbpZ6/i5idu2m
oPD4dbqhqJXgMcxOGq9Jv5Xub87ADkocPQalDPfKh6ZiOCNTW1Gr9dUzAe0nhTgs
6Ei++m4YKooGslBULvIHY7O5pcuGc640vI0799q+/yWwJuJeS23hyW1OBYrDxPXi
RI6II+aEJJnvva7ZKCLLalQxnB7i5BCCxhvS+vGx4AcLxfbEUwKHXMf4rnEeJ9yE
2hh+05wjUePHFe1YQBiEwJb3X8uLbKWBE4Qdz4NE9l1JcJJ4uPZ9LCn0o7tp68Ln
aEX5S1O1BennbhzejmqvT++2njd7T77srY2gTmHZECKK2QjwnvcypH8NKIkCAwEA
AQKCAgAXjRlpkuwojHD3bbfpxlgi8nAABgV3nvA61jxLEN7fm8BDVUllRZkg6UH5
KH6Hl0TX2exhtzu7A5d34+YcWmhBhgFnunuQoZywMOJiWQkyT/W630qm7o8i2qiZ
shf5R9CFDY84/72241iSxMT0M5UBbCsOXWmSLAJ/sn4pTXU2wvj1aXUrKxHcACk2
j6KvA/Dm7mdMkFYVyxFncUdMpM5NEusTNX8GuBX5znsPOMu5oArn6QhZBkUZRWTF
eH7nZkHkpRWSUX5nBPGJZK6pRQPCFDnCpfIKZdnjTYktsQJ4HSnkoSKCxwMexmu8
T/ET6sUoIib87x3iH9M5Io1Vj7JOmZJxlkkwnhhfYGlaxj1X3E4WuwkXU7BEAEbr
krcNc2t+MadOsozuVKPIgIxYc+ojsHb5WJVbDjcSABYW3OOJkh5YbLHbfF94ltl4
SMQWfljIAaXpLq8amEYKTPp6mjb4tgYjDeKb6sXYAT19tTzVGutsKR0OBs23C00H
7mb5UiLQkqqU2kh4adWZEbgi4a6hxuVAFWv2qlso/beBVhb5+7XmisYatVbbSU57
OouvawIHAduBy/ARDPzTFAHp1WiFkkdVCApvSY+8HOLmdAYxFNMlYgGx4ujHqSlV
HC7dCTrIcmvDGo+1KZkl4UWCGV2f4rXclxcIYSQT0aeWsJF/jQKCAQEA3SJTwzKS
DU/B/6+PQC2Hfv5gqBj+YjtQQ7awJaZtYGn8I8SZsmLdrsoxe0pi9OZGdrVyvkC+
Hk8rNeRHb0oU445+YI3crIvTjKlqUlB1eOoxgQIgGvu/Kw4qM7d9jjWnnNYvlpte
9n0hlJdMM2L7xQkynYJZQnKqfrO0LdPZ+qt75xPcs1MBDCdVsIF/Hinlo7FKVONN
irW7SwK8SmfPB6gn8jkYeGoNO5AgmFIMgA3ImABQvP6b/iwmUy7QBTXecYxbmiYa
/Q+Yh2OQCN9b9Y3wAWvlgnHg6nUVCCYHdPooi+JYHlZlds3k7ELMATdo5DK+Snbq
uSNrk2fYFIwd0wKCAQEAwn7ZnrfWfeHWyw68Cvqd5tEYf1noFonh7m9dCvkWP8gY
8KFBJS3ASDHonRWJeaOW+g5CiOw8XYN4qnLcNaK/dY0Hiax4snAJ+aVkK+L0We2d
2dpM2/kilTHMnOGhEDOf7+sQ0beFT/N6Lr2TMRj6kJMcp4jSXI9AJD0GPilUDebD
Z2ffFToKcWQsOVmQ82tndxpjhPWAhaRxhEmbPDZyfp0zB5CDzq8wGCGZF8Tmdt07
2GQC23PRrX9ftjD/KSBQZww/fhMNPrh3/3FZSDdUOnErWILXpyvVeMyDvxBPVHCu
gohD2oyB8lpWRj0coHPldCByFfMew9IUDHNRuFO6swKCAQA30pKSlBGKirfOc+MV
sGikBlMgHC8bXR3F+jg9SOYTkK212cty3MJZfXFATmbsq7TeArAUlwNnY1TlJdti
nLDpQO9mMGmkpSeiOqI8ZVNCUtxsVL0GEscPd2Pv6kInxCOr0+XvfwlZ7/yqJgd2
cWZdNxUv7dfajle75GF3sCM2xFNi4gC0xB9fkg5voEEWvDzcNcUt6LOKcJX3OZmO
ruX0aN6spv0maJ8uihOwYAYHzXL17B51l1CJuVtzZD3fEto0j9oP786gU2+NvfR+
SORN+Ka9tR8a7uR4S1Yj2HXJcd0KcvkLr4OtmgxQGAynwfUYpjajVaGrWuWtMGm7
xiNBAoIBADOSs1303XlvwycA9zfqEKi91UMfsf0X/sLc4M0iE5ZCFurnt4CGSzBZ
m5bbuSJ6EHSqB1aLXc5mKD76Sg4m46HmDZOiGjcmol6CTrecbLLT4UF9M1g5DcSF
+f23jp/fMI/Lwx/5C+6RX1q5hihEuVxQxg5ep3lHuvhg/iDJkLJG+JWY43ybcV1z
9I4Yg+koF71rT+xXtQa6/ibX5cPnpCCSyo888NaDebtMXW4CFiJ6s33Dt0Y9xeG9
nsGO6HodSXSpuMRThPWWsKsZgVU25qzAiX/k4g4//1ES2fR1/LMlVgDi5Ss0itia
v7nMRqT9VmCeoeHUH9pJAGv0wDyiZyUCggEBAJfsPWTEUeO+/Xw4sSVqDZRXVu2H
iCFPhsEhpKzWXd9v7fOFgxpXJoe4XKqIu1QMOyF7PDUW4aBymvCax2w08qTZzZda
GBXjDjR5ZXoAbfmtc+g8zJLHTzUpMrUDhEHSAsUAoyRQ5jesv+CBcrRZDc9V0vRr
UrlrUNvMZCPYRSdRCsdVZGy1mV5B/NgUTSVULvHo0tW0GWxVbZs2+o4ic0LXnMi0
38n2kGuv28DgLPYPRUvGatHr1aW6aXCA6SUkATViV77Clus+oyHRLOWFfUQgUGia
e2e3wIL8D7sOw/atDu4tSmbiE/OxZZlnXFi76DD3noTAEANWz5SEf/KSNd0=
-----END RSA PRIVATE KEY----- 
`;

const saltRounds = 10;

router.use(function (req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      req.hashedPassword = hash;
      next();
    });
  });
});

//register
router.post("/register", async function (req, res, next) {
  if (req.body.username && req.body.password && req.body.passwordConfirmation) {
    if (req.body.password === req.body.passwordConfirmation) {
      const user = new User({
        username: req.body.username, password: req.hashedPassword,
      });
      return await user
        .save()
        .then((savedUser) => {
          return res.status(201).json({
            id: savedUser._id, username: savedUser.username,
          });
        })
        .catch((error) => {
          return res.status(500).json({error: error.message});
        });
    }
    res.status(400).json({error: "Passwords not matching"});
  } else {
    res.status(400).json({error: "Username or Password Missing"});
  }
});

//login
router.post("/login", async function (req, res, next) {
  if (req.body.username && req.body.password) {
    const user = await User.findOne()
      .where("username")
      .equals(req.body.username)
      .exec();
    if (user) {
      return bcrypt
        .compare(req.body.password, user.password)
        .then((result) => {
          if (result === true) {
            const token = jwt.sign({id: user._id}, privateKey, {
              algorithm: "RS256",
            });
            return res.status(200).json({access_token: token});
          } else {
            return res.status(401).json({error: "Invalid credentials."});
          }
        })
        .catch((error) => {
          return res.status(500).json({error: error.message});
        });
    }
    return res.status(401).json({error: "Invalid credentials."});
  } else {
    res.status(400).json({error: "Username or Password Missing"});
  }
});

module.exports = router;

