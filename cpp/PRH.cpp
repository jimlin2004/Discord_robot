#include <bits/stdc++.h>
using namespace std;

int priority(char op)
{
    switch(op)
    {
        case '+': case '-':
            return 1;
        case '*': case '/': case '%':
            return 2;
        default:
            return 0;
    }
}

string to_postfix(string infix)
{   
    stack<char> stk;
    istringstream isstream(infix);
    ostringstream postfix;
    string word;
    while (isstream >> word)
    {
        if (isdigit(word[0]))
            postfix << word << " ";
        else
        {
            switch (word[0])
            {
                case ' ':
                    break;
                case '(':
                    stk.push(word[0]);
                    break;
                case '+': case '-': case '*': case '/': case '%':
                    if(!stk.empty())
                    {
                        while (priority(stk.top()) >= priority(word[0]))
                        {
                                postfix << stk.top() << " ";
                                stk.pop();
                                if (stk.empty())
                                    break;
                        }
                        stk.push(word[0]);
                    }
                    else
                        stk.push(word[0]);
                    break;
                case ')':
                    while (stk.top() != '(')
                    {
                        postfix << stk.top() << " ";
                        stk.pop();
                    }
                    stk.pop(); //不輸出 '('
                    break;
                default:
                    break;
            }
        }
        
    }
    while (!stk.empty())
    {
        postfix << stk.top() << " ";
        stk.pop();
    }
    return postfix.str();
}

long long int postfix_compute(string postfix)
{
    stack<long long int> stk;
    istringstream reader(postfix);
    string word;
    long long int n1, n2;
    while (reader >> word)
    {
        if (isdigit(word[0]))
            stk.push(atoi(word.c_str()));
        else
        {
            switch (word[0])
            {
                case '+':
                    n1 = stk.top();
                    stk.pop();
                    n2 = stk.top();
                    stk.pop();
                    stk.push(n2 + n1);
                    break;
                case '-':
                    n1 = stk.top();
                    stk.pop();
                    n2 = stk.top();
                    stk.pop();
                    stk.push(n2 - n1);
                    break;
                case '*':
                    n1 = stk.top();
                    stk.pop();
                    n2 = stk.top();
                    stk.pop();
                    stk.push(n2 * n1);
                    break;
                case '/':
                    n1 = stk.top();
                    stk.pop();
                    n2 = stk.top();
                    stk.pop();
                    stk.push(n2 / n1);
                    break;
                case '%':
                    n1 = stk.top();
                    stk.pop();
                    n2 = stk.top();
                    stk.pop();
                    stk.push(n2 % n1);
                    break;
            }
        }
    }
    return stk.top();
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    string infix, postfix;
    while (getline(cin, infix))
    {
        postfix = to_postfix(infix);
        long long ans = postfix_compute(postfix);
        printf("%d\n", ans);
    }
    // system("pause");
    return 0;
}