import User from "../models/Users.mjs"

// Read
// Ye id : ham jab register karte hai to id ko store kar lenge 
// and then baad me : use karenge to make calls !!
export const getUser = (req, res) => {
    let id = req.params.id;
    User.findById(id, function (err, response) {
        if (err) {
            res.status(500).send(err + "");
        }
        else {
            res.status(200).json(response);
        }
    })
}

export const getUserFriends = (req, res) => {
    const { id } = req.params;
    User.findById(id, async (err, user) =>{
        if (err) {
            res.status(500).json({ errMessage: `${err}` });
        }
        else {
            // Basically: time lag raha tha in sabko karke lane me 
            // that is why we took them as async !!
            const friends = await Promise.all(
                user.friends.map((id) => User.findById(id))
            );
            const formattedFriends = friends.map(
                ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                    return { _id, firstName, lastName, occupation, location, picturePath };
                }
            );
            res.status(200).json(formattedFriends);
        }
    })
}




export const addRemoveFriend = (req, res) => {

    // So basically : friends array will contain the id of all the friends !!
    // these are those unique ids that we used to getUser() 
    const { id, friendsId } = req.params;
    User.findById(id, function (err, result) {
        if (err) {
            res.status(500).json(err);
        }
        else {
            const friends = result.friends;
            // now if within friends : this id is not found then we will add
            // else remove !!

            if (friends.includes(friendsId)) {
                result.friends = result.friends.filter((_id) => {
                    return (_id !== friendsId);
                });
                result.save();
                User.findById(friendsId, function (err, result2) {
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        const friends = result2.friends;
                        // now if within friends : this id is not found then we will add
                        // else remove !!

                        if (friends.includes(id)) {
                            result2.friends = result2.friends.filter((_id) => {
                                return (_id !== id);
                            });
                            result2.save();
                            res.status(201).send("Success in removing !!");
                        }

                    }
                })
            }
            else {
                result.friends.push(friendsId);
                result.save();
                User.findById(friendsId, async (err, result2)=>{
                    if (err) {
                        res.status(500).json(err);
                    }
                    else {
                        result2.friends.push(id);
                        result2.save();
                        const friends = await Promise.all(
                            result.friends.map((id) => User.findById(id))
                        );
                        const formattedFriends = friends.map(
                            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                                return { _id, firstName, lastName, occupation, location, picturePath };
                            }
                        );
                        res.status(201).json(formattedFriends);
                    }
                })
            }

        }
    })

}