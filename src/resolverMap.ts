import axios from "axios"
import { getLogger } from "log4js"
import { IResolvers } from "graphql-tools"

interface User {
    username: string
    email: string | null,
    searchedForCounter: number,
    followers: number,
    followed: number
}

const enum LogLevel {
    info = "info",
    debug = "debug",
    trace = "trace",
    error = "error"
}

const users: { [key: string]: User } = {}

// set default logger
const logger = getLogger()
logger.level = "info"

const resolverMap: IResolvers = {
  Query: {
    async getUser(parent: void, args: { id: string })
    {
        logger.info("get github information for user " + args.id)
        // fetch user info from github
        const res = await axios.get("https://api.github.com/users/"+ args.id)
            const user = res.data
            
            logger.trace("Fetched user data from github: ", user)

            users[user.login] = {
                username: user.login,
                email: user.email,
                searchedForCounter: users[user.login] ? users[user.login].searchedForCounter ++ : 1,
                followers: user.followers,
                followed: user.following
            }
            
            logger.info("Request finished successfuly, returning data", users[user.login])
    
            return users[user.login]
    },
    mostSearched(parent: void, args: { limit: number })
    {
        logger.info("max user to return: " + args.limit)
        let reorderedData: User[]  = []
        for (const user in users)
        {
            logger.trace("Push data in reorderData variable", user)
            reorderedData.push(users[user])
        }
    
        reorderedData = reorderedData.sort((a, b) => b.searchedForCounter - a.searchedForCounter)
        logger.trace("Reordered data: ",reorderedData)
        const data = reorderedData.splice(0,args.limit)
        logger.trace("return data", data)
        logger.info("Request finished successful")
        return data 
    },
    setLogLevel(parent: void, args: { level: LogLevel })
    {
        logger.info("change log level to: " + args.level)
        logger.level = args.level
        return { status: "ok" }    
    }
},
Mutation: {
    resetUsers(parent: void, args: void)
    {
        logger.info("Request for resetUser mutation")
        logger.trace("Reset all users", users)

        for (var user in users) {
            logger.trace("Reset user", user)
            users[user].searchedForCounter = 0
        }

        logger.trace("All user are reset to default value", users)
        logger.info("Request finished successfuly")
        return { status: "ok" }
    }
}
}

export default resolverMap