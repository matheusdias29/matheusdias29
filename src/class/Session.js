export class Session 
{
    constructor(browserPage, id)
    {
        this.browserPage = browserPage
        this.id = id
        this.name = ""
        this.loginStep = 0
        this.IremovalStep = 0
        this.IkeyStep = 0
        this.HelloStep = 0
        this.Unlock = 0
        this.PhoenixStep = 0
    }

    getId()
    {
        return this.id
    }

    setName(name)
    {
        this.name = name
    }

    getName()
    {
        return this.name
    }

    setLoginStep(value)
    {
        this.loginStep = value
    }

    getLoginStep()
    {
        return this.loginStep
    }

    setIremovalStep(value)
    {
        this.IremovalStep = value
    }
    
    getIremovalStep()
    {
        return this.IremovalStep
    }

    setIkeyStep(value)
    {
        this.IkeyStep = value
    }
    
    getIkeyStep()
    {
        return this.IkeyStep
    }

    setHelloStep(value)
    {
        this.HelloStep = value
    }
    
    getHelloStep()
    {
        return this.HelloStep
    }
    setUnlockStep(value)
    {
        this.UnlockStep = value
    }
    
    getUnlockStep()
    {
        return this.UnlockStep
    }

    setPhoenixStep(value)
    {
        this.PhoenixStep = value
    }
    
    getPhoenixStep()
    {
        return this.PhoenixStep
    }
}