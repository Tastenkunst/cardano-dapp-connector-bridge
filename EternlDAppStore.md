## Integration into the Eternl DApp Store.
The Eternl DApp Store is the first comfort feature for users, that we will monetize.

### Advantage for the User

+ mobile dApps (iOS/Android apps and website)
+ favorite dApps in one place
+ optional feature (can use browser extension instead)

### User Fee for Comfort Feature

+ 0.1% or 1 ADA (whichever is higher) on every buy order/swap >= 100 ADA.
+ no fee on list, delist, cancel, price update etc.
+ no fee on buy orders/swaps < 100 ADA

| Order Amount | Fee     | %      |
|---------------|---------|--------|
| 100 ADA       | 1 ADA   | 1.0%   |
| 200 ADA       | 1 ADA   | 0.5%   |
| 500 ADA       | 1 ADA   | 0.2%   |
| 1000 ADA      | 1 ADA   | 0.1%   |
| 2000 ADA      | 2 ADA   | 0.1%   |

### Examples

#### Browser Extension:

+ **5000 ADA** - buy order for NFT
+ **125 ADA** - marketplace fee 2.5%
+ **5000 ADA** - paid by buyer
    + **4875 ADA** - for the seller
    + **125 ADA** - for the marketplace

#### DApp Store, comfort fee paid by user:

+ **5000 ADA** - buy order for NFT
+ **125 ADA** - marketplace fee 2.5%
+ _5 ADA_ - Eternl fee 0.1%
+ **5005 ADA** - paid by buyer
    + **4875 ADA** - for the seller
    + **125 ADA** - for the marketplace
    + _5 ADA_ - for Eternl

#### Advantage for dApp

+ higher volume through mobile traffic
+ literally no risks involved

#### Easy Implementation

+ Add an additional output to the BUY transactions

For dApps there are no downsides to this concept. The fee can be clearly communicated to be an addition for using the
Eternl DApp Store. Users are free to use the browser extension instead, if they want to avoid the comfort fee.

DApps will see increased volume due to mobile traffic. Of course it's also completely optional for dApps to join the
Eternl DApp Store.

