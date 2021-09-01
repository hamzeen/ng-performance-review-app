module.exports = {
  development: {
    name: 'dev',
    port: 4201,
    saltingRounds: 10
  },
  production: {
    name: 'prod',
    port: process.env.PORT | 4202,
    saltingRounds: 10
  }
};
