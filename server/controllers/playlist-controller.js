const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);

    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
deletePlaylist = async (req, res) => {
    await Playlist.findByIdAndDelete({ _id: req.params.id }, (err, list) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: list })
    }).catch(err => console.log(err)) 
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlist not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        // if (!playlists.length) {
        //     return res
        //         .status(404)
        //         .json({ success: false, error: 'Playlists not found'})
        // }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}
// updatePlaylistById = async (req, res) => {
//     const body = req.body

//     if(!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }
//     await Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Playlist not found!',
//             })
//         }
//         playlist.name = body.name
//         playlist.songs = body.songs
//         playlist
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: playlist._id,
//                     message: 'Playlist updated',
//                 })
//             })
//             .catch(error => {
//                 return res.status(404).json({
//                     error,
//                     message: 'Movie not updated',
//                 })
//             })
//     })
// }
updatePlaylistById = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(404).json({err, message: "Playlist not found",})
        }
        list.name = body.name
        list
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: list._id,
                    message: 'Playlist Updated!',
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Playlist Not Updated!',
                })
            })
    }).catch(err => console.log(err))
}
createSong = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(404).json({err, message: "Playlist not found",})
        }
        list.songs.splice(body.index, 0, body.song);
        list
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: list._id,
                    message: 'List updated!',
                })
            }).catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Playlist Not Created!',
                })
            })
    })
}
// deleteSong = async (req, res) => {
//     const body = req.body;

//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a Playlist',
//         })
//     }

//     await Playlist.findOne({ _id: req.params.id }, (err, list) => {
//         if (err) {
//             return res.status(404).json({err, message: "Playlist not found",})
//         }
//         list.songs.splice(list.songs.length, 1);
//         console.log(songs);
//         list
//             .save()
//             .then(() => {
//                 return res.status(200).json({
//                     success: true,
//                     id: list._id,
//                     message: 'List updated!',
//                 })
//             }).catch(error => {
//                 return res.status(400).json({
//                     error,
//                     message: 'Playlist Not Created!',
//                 })
//             })
//     })
// }

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    deletePlaylist,
    createSong,
    updatePlaylistById,
}