import * as React from 'react';
import {
  Card,
  Form,
  Flag,
  Grid,
  Label,
  Icon,
  Input,
  Popup,
  Segment,
  Select
} from 'semantic-ui-react';
// import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

// const errorPopup = {
//   borderRadius: '5',
// opacity: '0.7',
// padding: '0.86em',
// color: '#ff6961'
// };
type FlagType = 'ad' | 'andorra' | 'ae' | 'united arab emirates' | 'uae' | 'af' | 'afghanistan' | 'ag' | 'antigua' | 'ai' | 'anguilla' | 'al' | 'albania' | 'am' | 'armenia' | 'an' | 'netherlands antilles' | 'ao' | 'angola' | 'ar' | 'argentina' | 'as' | 'american samoa' | 'at' | 'austria' | 'au' | 'australia' | 'aw' | 'aruba' | 'ax' | 'aland islands' | 'az' | 'azerbaijan' | 'ba' | 'bosnia' | 'bb' | 'barbados' | 'bd' | 'bangladesh' | 'be' | 'belgium' | 'bf' | 'burkina faso' | 'bg' | 'bulgaria' | 'bh' | 'bahrain' | 'bi' | 'burundi' | 'bj' | 'benin' | 'bm' | 'bermuda' | 'bn' | 'brunei' | 'bo' | 'bolivia' | 'br' | 'brazil' | 'bs' | 'bahamas' | 'bt' | 'bhutan' | 'bv' | 'bouvet island' | 'bw' | 'botswana' | 'by' | 'belarus' | 'bz' | 'belize' | 'ca' | 'canada' | 'cc' | 'cocos islands' | 'cd' | 'congo' | 'cf' | 'central african republic' | 'cg' | 'congo brazzaville' | 'ch' | 'switzerland' | 'ci' | 'cote divoire' | 'ck' | 'cook islands' | 'cl' | 'chile' | 'cm' | 'cameroon' | 'cn' | 'china' | 'co' | 'colombia' | 'cr' | 'costa rica' | 'cs' | 'serbia' | 'cu' | 'cuba' | 'cv' | 'cape verde' | 'cx' | 'christmas island' | 'cy' | 'cyprus' | 'cz' | 'czech republic' | 'de' | 'germany' | 'dj' | 'djibouti' | 'dk' | 'denmark' | 'dm' | 'dominica' | 'do' | 'dominican republic' | 'dz' | 'algeria' | 'ec' | 'ecuador' | 'ee' | 'estonia' | 'eg' | 'egypt' | 'eh' | 'western sahara' | 'er' | 'eritrea' | 'es' | 'spain' | 'et' | 'ethiopia' | 'eu' | 'european union' | 'fi' | 'finland' | 'fj' | 'fiji' | 'fk' | 'falkland islands' | 'fm' | 'micronesia' | 'fo' | 'faroe islands' | 'fr' | 'france' | 'ga' | 'gabon' | 'gb' | 'united kingdom' | 'gd' | 'grenada' | 'ge' | 'georgia' | 'gf' | 'french guiana' | 'gh' | 'ghana' | 'gi' | 'gibraltar' | 'gl' | 'greenland' | 'gm' | 'gambia' | 'gn' | 'guinea' | 'gp' | 'guadeloupe' | 'gq' | 'equatorial guinea' | 'gr' | 'greece' | 'gs' | 'sandwich islands' | 'gt' | 'guatemala' | 'gu' | 'guam' | 'gw' | 'guinea-bissau' | 'gy' | 'guyana' | 'hk' | 'hong kong' | 'hm' | 'heard island' | 'hn' | 'honduras' | 'hr' | 'croatia' | 'ht' | 'haiti' | 'hu' | 'hungary' | 'id' | 'indonesia' | 'ie' | 'ireland' | 'il' | 'israel' | 'in' | 'india' | 'io' | 'indian ocean territory' | 'iq' | 'iraq' | 'ir' | 'iran' | 'is' | 'iceland' | 'it' | 'italy' | 'jm' | 'jamaica' | 'jo' | 'jordan' | 'jp' | 'japan' | 'ke' | 'kenya' | 'kg' | 'kyrgyzstan' | 'kh' | 'cambodia' | 'ki' | 'kiribati' | 'km' | 'comoros' | 'kn' | 'saint kitts and nevis' | 'kp' | 'north korea' | 'kr' | 'south korea' | 'kw' | 'kuwait' | 'ky' | 'cayman islands' | 'kz' | 'kazakhstan' | 'la' | 'laos' | 'lb' | 'lebanon' | 'lc' | 'saint lucia' | 'li' | 'liechtenstein' | 'lk' | 'sri lanka' | 'lr' | 'liberia' | 'ls' | 'lesotho' | 'lt' | 'lithuania' | 'lu' | 'luxembourg' | 'lv' | 'latvia' | 'ly' | 'libya' | 'ma' | 'morocco' | 'mc' | 'monaco' | 'md' | 'moldova' | 'me' | 'montenegro' | 'mg' | 'madagascar' | 'mh' | 'marshall islands' | 'mk' | 'macedonia' | 'ml' | 'mali' | 'mm' | 'myanmar' | 'burma' | 'mn' | 'mongolia' | 'mo' | 'macau' | 'mp' | 'northern mariana islands' | 'mq' | 'martinique' | 'mr' | 'mauritania' | 'ms' | 'montserrat' | 'mt' | 'malta' | 'mu' | 'mauritius' | 'mv' | 'maldives' | 'mw' | 'malawi' | 'mx' | 'mexico' | 'my' | 'malaysia' | 'mz' | 'mozambique' | 'na' | 'namibia' | 'nc' | 'new caledonia' | 'ne' | 'niger' | 'nf' | 'norfolk island' | 'ng' | 'nigeria' | 'ni' | 'nicaragua' | 'nl' | 'netherlands' | 'no' | 'norway' | 'np' | 'nepal' | 'nr' | 'nauru' | 'nu' | 'niue' | 'nz' | 'new zealand' | 'om' | 'oman' | 'pa' | 'panama' | 'pe' | 'peru' | 'pf' | 'french polynesia' | 'pg' | 'new guinea' | 'ph' | 'philippines' | 'pk' | 'pakistan' | 'pl' | 'poland' | 'pm' | 'saint pierre' | 'pn' | 'pitcairn islands' | 'pr' | 'puerto rico' | 'ps' | 'palestine' | 'pt' | 'portugal' | 'pw' | 'palau' | 'py' | 'paraguay' | 'qa' | 'qatar' | 're' | 'reunion' | 'ro' | 'romania' | 'rs' | 'serbia' | 'ru' | 'russia' | 'rw' | 'rwanda' | 'sa' | 'saudi arabia' | 'sb' | 'solomon islands' | 'sc' | 'seychelles' | 'gb sct' | 'scotland' | 'sd' | 'sudan' | 'se' | 'sweden' | 'sg' | 'singapore' | 'sh' | 'saint helena' | 'si' | 'slovenia' | 'sj' | 'svalbard' | 'jan mayen' | 'sk' | 'slovakia' | 'sl' | 'sierra leone' | 'sm' | 'san marino' | 'sn' | 'senegal' | 'so' | 'somalia' | 'sr' | 'suriname' | 'st' | 'sao tome' | 'sv' | 'el salvador' | 'sy' | 'syria' | 'sz' | 'swaziland' | 'tc' | 'caicos islands' | 'td' | 'chad' | 'tf' | 'french territories' | 'tg' | 'togo' | 'th' | 'thailand' | 'tj' | 'tajikistan' | 'tk' | 'tokelau' | 'tl' | 'timorleste' | 'tm' | 'turkmenistan' | 'tn' | 'tunisia' | 'to' | 'tonga' | 'tr' | 'turkey' | 'tt' | 'trinidad' | 'tv' | 'tuvalu' | 'tw' | 'taiwan' | 'tz' | 'tanzania' | 'ua' | 'ukraine' | 'ug' | 'uganda' | 'um' | 'us minor islands' | 'us' | 'america' | 'united states' | 'uy' | 'uruguay' | 'uz' | 'uzbekistan' | 'va' | 'vatican city' | 'vc' | 'saint vincent' | 've' | 'venezuela' | 'vg' | 'british virgin islands' | 'vi' | 'us virgin islands' | 'vn' | 'vietnam' | 'vu' | 'vanuatu' | 'gb wls' | 'wales' | 'wf' | 'wallis and futuna' | 'ws' | 'samoa' | 'ye' | 'yemen' | 'yt' | 'mayotte' | 'za' | 'south africa' | 'zm' | 'zambia' | 'zw' | 'zimbabwe';

@observer
export default class UserDetails extends React.Component<any, any> {
  private options = [
    { key: 'Dr', text: 'Dr', value: 'Dr' },
    { key: 'Mr', text: 'Mr', value: 'Mr' },
    { key: 'Ms', text: 'Miss', value: 'Ms' },
    { key: 'Mrs', text: 'Mrs', value: 'Mrs' },
    { key: 'prof', text: 'Prof', value: 'Prof' }
  ];
 
  constructor(props:any) {
    super(props);
    
  }

  render(): JSX.Element {
    return (
      <Segment compact={true} basic={true} vertical={true} className={'bd-0'}>
        <Label
          content={'Personal Information'}
          className={'content-left-label'}
          icon={'address book'}
        />
        <Card raised={true} className={'profile__card bg-gray-200 bd-0'}>
          <Card.Content>
            <Form>
              <Grid columns={2}>
                {/* Title*/}
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field>
                      <label>Title:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field
                      control={Select}
                      options={this.options}
                      placeholder={'Title'}
                      value={this.props.title}
                      onChange={this.props.onTitleChanged}
                    />
                  </Grid.Column>
                </Grid.Row>
                {/* First name*/}
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field required={true} error={!this.props.first_name}>
                      <label>First Name:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required={true} error={!this.props.first_name}>  
                      <Popup
                        trigger={<Input
                          placeholder={'First name'}
                          label={{ icon: 'asterisk', color: 'red', size:'mini' }}
                          labelPosition={'left corner'}
                          value={this.props.first_name}
                          onChange={this.props.onFirstnameChanged}
                        />}
                        open={!this.props.first_name}
                        
                        position={'bottom center'}
                        size={'large'}
                        className={'errorPopup'}
                        inverted={true}>
                         <Popup.Content>
                          <Icon name={'exclamation triangle'} />{'First name is required'}
                         </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field required={true} error={!this.props.last_name}>
                      <label>Last Name:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required={true} error={!this.props.last_name}>
                      <Popup
                        trigger={<Input
                                    placeholder={'Last Name'}
                                    label={{ icon: 'asterisk', color: 'red', size: 'mini' }}
                                    labelPosition={'left corner'}
                                    value={this.props.last_name}
                                    onChange={this.props.onLastnameChanged}
                                  />}
                        open={!this.props.last_name}
                        position={'bottom center'}
                        size={'large'}
                        className={'errorPopup'}
                        inverted={true} >
                        <Popup.Content>
                          <Icon name={'exclamation triangle'} />{'Last name is required'}
                        </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field>
                      <label>
                        {'Location'} <Icon name={'point'} /> {':'}{' '}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input
                        placeholder={'City , Country e.g Mumbai, IN'}
                        value={this.props.location}
                        label={
                          <Flag 
                            name={(_.toLower(this.props.nationality))as FlagType} />
                        }
                        labelPosition={'right'}
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field>
                      <label>
                        {'Portfolio URL'} <Icon name={'linkify'} /> {':'}{' '}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input placeholder={'http://myawesome.portfolio.com'} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign={'left'} width={4}>
                    <Form.Field>
                      <label>
                        {'Linkein URL'} <Icon name={'linkedin square'} /> {':'}{' '}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input placeholder={'http://linkedin.com/profile/'} />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}
