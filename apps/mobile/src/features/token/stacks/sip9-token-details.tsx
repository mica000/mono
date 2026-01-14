import { ExternalLink } from '@/components/external-link';
import { SummaryTableItem, SummaryTableRoot } from '@/components/summary-table';
import { Sip9 } from '@/features/token/stacks/sip9';
import { getChainDisplayLabel, getProtocolDisplayLabel } from '@/shared/display-preference';
import { t } from '@lingui/core/macro';

import { formatAttributeValue, getSip9Info } from '@leather.io/features';
import { Sip9Asset } from '@leather.io/models';
import { truncateMiddle } from '@leather.io/utils';

import { Collectible, useCollectibleHeight } from '../collectible';
import { TokenDescription } from '../components/token-description';
import { TokenDetailsCard } from '../components/token-details-card';
import { Sip9TokenStats } from './sip9-token-stats';

interface Sip9TokenDetailsProps {
  asset: Sip9Asset;
}

export function Sip9TokenDetails({ asset }: Sip9TokenDetailsProps) {
  const height = useCollectibleHeight();
  const info = getSip9Info(asset);

  // Keep these for backward compatibility with existing stats components
  const floorPrice = asset.collection?.floorPrice;
  const latestSale = asset.collection?.latestSale;

  return (
    <Collectible name={info.name || asset.name} details={asset}>
      <TokenDetailsCard>
        <Sip9 item={asset} height={height} />
      </TokenDetailsCard>
      {!!(latestSale || floorPrice) && (
        <Sip9TokenStats floorPrice={floorPrice} latestSale={latestSale} />
      )}
      {info.description && <TokenDescription description={info.description} />}

      <TokenDetailsCard title={t`Collectible Info`}>
        <SummaryTableRoot>
          <SummaryTableItem label={t`Name`} value={info.tokenId?.toString() ?? ''} />
          {info.collectionName && (
            <SummaryTableItem
              label={t`Collection`}
              value={<ExternalLink url={info.collectionUrl ?? ''} label={info.collectionName} />}
            />
          )}
          {info.creator && (
            <SummaryTableItem
              label={t`Creator`}
              value={<ExternalLink url={info.creator} label={info.creator} />}
            />
          )}
          {info.rarityRank && info.totalItems && (
            <SummaryTableItem label={t`Rarity rank`} value={t`${info.rarityRank} of ${info.totalItems}`} />
          )}
          <SummaryTableItem label={t`Layer`} value={getChainDisplayLabel(asset.chain)} />
          <SummaryTableItem label={t`Protocol`} value={getProtocolDisplayLabel(asset.protocol)} />
          <SummaryTableItem
            label={t`Contract`}
            value={
              <ExternalLink
                url={info.contractUrl ?? ''}
                label={truncateMiddle(asset.contractId, 5)}
              />
            }
          />
          <SummaryTableItem label={t`File type`} value={info.contentType ?? ''} />
        </SummaryTableRoot>
      </TokenDetailsCard>
      {info.attributes.length > 0 && (
        <TokenDetailsCard title={t`Attributes`}>
          <SummaryTableRoot>
            {info.attributes.slice(0, 12).map((attribute, idx) => (
              <SummaryTableItem
                key={`${attribute.traitType}-${idx}`}
                label={attribute.traitType}
                value={formatAttributeValue(attribute)}
              />
            ))}
          </SummaryTableRoot>
        </TokenDetailsCard>
      )}
    </Collectible>
  );
}
