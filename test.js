// const myPromise = new Promise((resolve, reject) => resolve())
//   .then(() => console.log("resolved"))
//   .catch(() => console.log("rejected"));

let savedResolve, savedReject;

const myPromise = new Promise((resolve, reject) => {
  savedResolve = resolve;
  savedReject = reject;
});

myPromise
  .then((value) => console.log("Promise Resolved: ", value))
  .catch((err) => console.log("Promise rejected: ", err));

setTimeout(() => {
  savedResolve("ami resolve hoye gechi");
}, 3000);

// savedReject("Error hoye geche");
