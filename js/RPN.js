"use strict";

class Stack
{
    constructor()
    {
        this._stk = [];
    }
    pop()
    {
        return this._stk.pop();
    }
    top()
    {
        return this._stk[this._stk.length - 1];
    }
    push(arg)
    {
        this._stk.push(arg);
    }
    empty()
    {
        if (this._stk.length == 0)
            return true;
        else
            return false;
    }
    clear()
    {
        this._stk.length = 0;
    }
};

module.exports = class RPN_module
{
    constructor(args) {
        this.stk = new Stack();
        let len = args.length;
        let infix = "";
        for (let i = 1; i < len; i++)
            infix += args[i] + ' ';
        this.postfix = this.to_postfix(infix);
        // console.log(this.postfix);
        // this.to_postfix(infix);
    }

    priority(op) {
        switch(op)
        {
            case '+': 
                return 1;
            case '-':
                return 1;
            case '*':
                return 2;
            case '/':
                return 2;
            case '%':
                return 2
            default:
                return 0;
        }
    }

    to_postfix(infix) {
        let pfx = "";
        this.stk.clear();
        // console.log(infix.split(' '));
        for (let word of infix.split(' '))
        {
            if (word == '')
                continue;
            let num = Number(word);
            if (!isNaN(num))
                pfx += word + ' ';
            else
            {
                switch (word)
                {
                    case ' ':
                        break;
                    case '(':
                        this.stk.push(word);
                        break;
                    case '+': case '-': case '*': case '/': case '%':
                        // console.log(word);
                        if(!this.stk.empty())
                        {
                            while (this.priority(this.stk.top()) >= this.priority(word))
                            {
                                pfx += this.stk.top() + ' ';
                                this.stk.pop();
                                if (this.stk.empty())
                                    break;
                            }
                            this.stk.push(word);
                        }
                        else
                            this.stk.push(word);
                        break;
                    case ')':
                        while (this.stk.top() != '(')
                        {
                            pfx += this.stk.top() + ' ';
                            this.stk.pop();
                        }
                        this.stk.pop();
                        break;
                    default:
                        break;
                }
            }
        }
        while (!this.stk.empty())
        {
            pfx += this.stk.top() + ' ';
            this.stk.pop();
        }
        return pfx;
    }

    calculate()
    {
        let n1, n2;
        this.stk.clear();
        // console.log(this.postfix.split(' '));
        for (let word of this.postfix.split(' '))
        {
            if (word == '')
                continue;
            let num = Number(word);
            if (!isNaN(num))
                this.stk.push(num);
            else
            {
                switch (word)
                {
                    case '+':
                        n1 = this.stk.top();
                        this.stk.pop();
                        n2 = this.stk.top();
                        this.stk.pop();
                        this.stk.push(n2 + n1);
                        break;
                    case '-':
                        n1 = this.stk.top();
                        this.stk.pop();
                        n2 = this.stk.top();
                        this.stk.pop();
                        this.stk.push(n2 - n1);
                        break;
                    case '*':
                        n1 = this.stk.top();
                        this.stk.pop();
                        n2 = this.stk.top();
                        this.stk.pop();
                        this.stk.push(n2 * n1)
                        break;
                    case '/':
                        n1 = this.stk.top();
                        this.stk.pop();
                        n2 = this.stk.top();
                        this.stk.pop();
                        this.stk.push(n2 / n1)
                        break;
                    case '%':
                        n1 = this.stk.top();
                        this.stk.pop();
                        n2 = this.stk.top();
                        this.stk.pop();
                        this.stk.push(n2 % n1)
                        break;
                }
            }
        }
        // console.log(this.stk.top());
        return this.stk.top();
    }
}