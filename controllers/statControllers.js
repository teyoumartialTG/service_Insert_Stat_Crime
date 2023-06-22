/* eslint-disable no-console */
var { Stats } = require('../models/statModel');
var ObjectID = require( 'mongoose'). Types.ObjectId;

exports.index = (req, res) => {
  Stats.find()
    .then(docs => {
      res.send(docs);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.stat = async (req, res) => {
  const pays = req.params.pays;
  const ville = req.params.ville;
  const quartier = req.params.quartier;
  const crime = req.params.crime;
  Stats.distinct('year')
    .then(years => {
      years.forEach(year => {
        Stats.distinct('month')
          .then(result => {
            const pieData = [];
            result.forEach(time => {
              Stats.find({ pays: pays, ville: ville, quartier: quartier, type_crime: crime, month: time, year: year })
                .then(statcrime => {
                  const value = statcrime.length;
                  const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
                  const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
                  const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
                  const color = "rgb("+r+","+g+","+b+")";
                  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                  const values = {
                    id: year+"-"+time,
                    label: year+"-"+monthNames[time-1],
                    value: value,
                    color: color
                  };
                  pieData.push(values);
                  if (pieData.length === result.length) {
                    res.send(pieData);
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: err });
                });
            });
          });
        });
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  /*try{
    const docs = await Stats.find({
      pays: pays,
      ville: ville,
      quartier: quartier,
      type_crime: crime
    }).exec();
    res.send(docs);
  }catch (err) {
    res.status(500).send(err);
  }
  Stats.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$time' },
          month: { $month: '$time' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1
      }
    }
  ]).exec()
    .then(result => {
      console.log(result);
      result.forEach(time => {
        Stats.find({ pays: pays, ville: ville, quartier: quartier, type_crime: crime, time: time })
          .then(statcrime => {
            const value = statcrime.length;
            const color = Math.floor(Math.random() * 401) + 100;
            const values = {
              id: time,
              label: time,
              value: value,
              color: "rgb(${color}, 70, 50)"
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });*/
};

exports.statcirculaire = (req, res) => {
  const pays = req.params.pays;
  const ville = req.params.ville;
  Stats.distinct('type_crime')
    .then(result => {
      const pieData = [];
      result.forEach(crime => {
        Stats.find({ pays: pays, ville: ville, type_crime: crime })
          .then(statcrime => {
            const value = statcrime.length;
            const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
            const color = "rgb("+r+","+g+","+b+")";
            const values = {
              id: crime,
              label: crime,
              value: value,
              color: color
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.statcirculaireBanditisme = (req, res) => {
  Stats.distinct('ville')
    .then(result => {
      const pieData = [];
      result.forEach(ville => {
        Stats.find({ ville: ville, type_crime: "Banditisme" })
          .then(statcrime => {
            const value = statcrime.length;
            const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
            const color = "rgb("+r+","+g+","+b+")";
            const values = {
              id: ville,
              label: ville,
              value: value,
              color: color
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.statcirculaireViol = (req, res) => {
  Stats.distinct('ville')
    .then(result => {
      const pieData = [];
      result.forEach(ville => {
        Stats.find({ ville: ville, type_crime: "Viol" })
          .then(statcrime => {
            const value = statcrime.length;
            const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
            const color = "rgb("+r+","+g+","+b+")";
            const values = {
              id: ville,
              label: ville,
              value: value,
              color: color
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.statcirculaireVol = (req, res) => {
  Stats.distinct('ville')
    .then(result => {
      const pieData = [];
      result.forEach(ville => {
        Stats.find({ ville: ville, type_crime: "Vol" })
          .then(statcrime => {
            const value = statcrime.length;
            const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
            const color = "rgb("+r+","+g+","+b+")";
            const values = {
              id: ville,
              label: ville,
              value: value,
              color: color
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.statcirculaireMeurtre = (req, res) => {
  Stats.distinct('ville')
    .then(result => {
      const pieData = [];
      result.forEach(ville => {
        Stats.find({ ville: ville, type_crime: "Meurtre" })
          .then(statcrime => {
            const value = statcrime.length;
            const r = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for red
            const g = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for green
            const b = Math.floor(Math.random() * 256); // generate a random value between 0 and 255 for blu
            const color = "rgb("+r+","+g+","+b+")";
            const values = {
              id: ville,
              label: ville,
              value: value,
              color: color
            };
            pieData.push(values);
            if (pieData.length === result.length) {
              res.send(pieData);
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.searchById = (req, res) => {
  const id = req.params.id;
  res.send(`Id found : ${id}`);
}

exports.insert = (req, res ) => {
  const newStats = new Stats({
    pays: req.body.pays,
    ville: req.body.ville,
    quartier: req.body.quartier,
    type_crime: req.body.type_crime,
    nbre_victime: req.body.nbre_victime,
    gravité: req.body.gravité,
    image: req.body.image,
    message: req.body.message,
    description: req.body.description,
  });
  newStats.save()
    .then(docs => {
      res.send(docs)
    })
    .catch(err => {
      res.send(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log(`update with given id: ${id}`);

  if(!ObjectID.isValid(id)){
    return res.send(400).send(`No record with given id: ${id}`)
  }

  const statItem = req.body.todo;
  const newStat = {
    todo: statItem
  };

  Stats.findByIdAndUpdate(id, {$set: newStat},{new: true},(err,docs )=>{
    if(!err){
      res.status(200).send(docs)
    } else {
      console.log('Error while updating the data' + JSON.stringify(err, undefined, 2))
    }
  })
}

exports.delete = (req, res ) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.send(400).send(`No record with given id: ${id}`)
  }

  Stats.findByIdAndRemove(id, (err, docs) => {
    const result = {
      data: docs,
      message: 'Todo has been removed successfully.',
      status: 200,
    }

    if (!err) {
      res.status(200).send(result)
    } else {
      res.status(500).send(err)
    }
  })
}