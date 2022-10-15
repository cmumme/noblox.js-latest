const http = require('../util/http.js').func

exports.required = ['universeIds']
exports.optional = ['jar']

// Docs
/**
 * 🔓 Get the info for a universe.
 * @category Game
 * @alias getUniverseInfo
 * @param {number | Array<number>} universeId - The id(s) of the universe(s).
 * @returns {Promise<UniverseInformation>}
 * @example const noblox = require("noblox.js")
 * const universeInfo = await noblox.getUniverseInfo([ 2152417643 ])
**/
/**
 * ✅ Returns rating details on the universe(s) in question, such as upvotes and downvotes. 
 * @category Game
 * @alias getUniverseRatings
 * @param universeIds The universe(s) whose rating details are being fetched.
 * @param jar
 * @returns {Proise<RatingDetails>}
 * @example const noblox = require("noblox.js")
 * const universeRatings = await noblox.getUniverseRatings([ 2152417643 ])
 */

function getUniverseRatings (universeIds, jar) {
  return new Promise((resolve, reject) => {
    if (typeof (universeIds) === 'number') universeIds = [universeIds]

    const httpOpt = {
      url: `//games.roblox.com/v1/games/votes?universeIds=${universeIds.join(',')}`,
      options: {
        json: true,
        resolveWithFullResponse: true,
        jar: jar,
        method: 'GET'
      }
    }

    return http(httpOpt)
      .then(function ({ statusCode, body }) {
        if (statusCode === 200) {
          resolve(body.data.map((universe) => {
            return universe
          }))
        } else if (body && body.errors) {
          reject(new Error(`[${statusCode}] ${body.errors[0].message} | universeIds: ${universeIds.join(',')} ${body.errors.field ? ` | ${body.errors.field} is incorrect` : ''}`))
        } else {
          reject(new Error(`An unknown error occurred with getUniverseRatings() | [${statusCode}] universeIds: ${universeIds.join(',')}`))
        }
      }).catch(reject)
  })
}

exports.func = function (...args) {
  return getUniverseRatings(...args)
}
